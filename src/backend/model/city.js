import { sortedIndexBy } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {TownCenter} from "../../common/model/city";

export class World
{
    constructor() {
        this.cities = [];
        this.vehicles = [];
    }

    addCity(city) {
        city.index = sortedIndexBy(this.cities, city, c => c.name);
        this.cities.splice(city.index, 0, [city]);
    }

    removeCity(city) {
        this.cities.splice(city.index, 1);
    }

    renameCity(city, newName) {
        this.removeCity(city);
        city.name = newName;
        this.addCity(city);
    }

    serialize() {
        return {
            cities: this.cities,
            vehicles: this.vehicles,
        };
    }

    static unserialize(obj) {
        const world = new World();
        world.cities = obj.cities.map(c => City.unserialize(c));
        world.vehicles = obj.vehicles.map(v => Vehicle.unserialize(v));
        return world;
    }

    /**
     * Increments the state of the world. Updates each city, which updates each building.
     * For transportation, I *think* we should store vehicles outside of cities/buildings? In which
     * case update those separately here. So you could create vehicles in one location and just send
     * an empty load elsewhere to give the vehicle to that city. Separately could make sense as well
     * if we have a separate tab for viewing in-transit vehicles.
     */
    tick(msElapsed) {
        this.cities.forEach(city => city.tick(this, msElapsed));
        this.vehicles.forEach(vehicle => vehicle.tick(this, msElapsed));
    }
}

export class City
{
    constructor() {
        this.id = uuidv4();
        this.index = -1;
        this.buildings = [];
    }

    serialize() {
        return {
            id: this.id,
            index: this.index,
            buildings: this.buildings.map(b => {
                return {
                    type: b.type.name,
                    name: b.name,
                    data: b.type.serialize ? b.type.serialize(b.data) : b.data,
                };
            })
        }
    }

    static unserialize(obj) {
        const city = new City();
        city.id = obj.id;
        city.index = obj.index;
        city.buildings = obj.buildings.map(b => {
            b.type = new TownCenterBackend(); // look this up from the string b.type
            b.data = b.type.unserialize ? b.type.unserialize(b.data) : b.data;
            return b;
        });
        return city;
    }

    tick(world, msElapsed) {
        this.buildings.forEach(b => b.type.tick(world, this, b, msElapsed));
    }
}

export class Vehicle
{
    constructor() {
        this.id = uuidv4();
    }

    serialize() {
        return {
            id: this.id,
        };
    }

    static unserialize(obj) {
        const vehicle = new Vehicle();
        vehicle.id = obj.id;
        return vehicle;
    }

    tick(world, msElapsed) {

    }
}

export class TownCenterBackend extends TownCenter
{
    tick(world, city, building, msElapsed) {
        const hasWoodcutting = building.data.upgrades.includes('woodcutting');
        const hasMining = building.data.upgrades.includes('mining');
    }
}