import 'purecss/build/pure.css';
import './../assets/style.css';
import m from 'mithril';
import { Client } from './client';
import { cloneDeep } from 'lodash';

(async function() {
    const client = new Client();

// Called when the background sends a sync command to update view model
    client.onSync = data => {

    };

    await client.start();
    //for ( let i = 0; i < 50; i++ ) {
    //    let resp = await client.request('test', { i });
    //    console.log(resp);
    //}
})();

const ViewModel = {
    cities: [
        {id: 1, name: 'Home Town', citizens: [1, 2, 3], landUsed: 0, populationCap: 10},
        {id: 2, name: 'Second Town', citizens: [1, 2, 3, 4, 5, 6, 7], landUsed: 5, populationCap: 15},
    ],
    currentCity: {
        id: 1,
        name: 'Home Town',
        landUsed: 0,
        landAvailable: 10,
        landTotal: 100,
        inventory: [
            {"id": "birch log", "name": "birch log", "qty": 8},
            {"id": "granite", "name": "granite", "qty": 5},
            {"id": "limestone", "name": "limestone", "qty": 10},
        ],
        buildings: [],
        citizens: [],
        populationCap: 10,
    },
};

ViewModel.cities[0].inventory = cloneDeep(ViewModel.currentCity.inventory);
ViewModel.cities[1].inventory = cloneDeep(ViewModel.currentCity.inventory);
ViewModel.cities[1].inventory[2].qty = 25;

window.view = ViewModel;
window.redraw = () => m.redraw();

/**
 * The left side contains tabs for the current city's inventory, and accessing the city list.
 */
class LeftSideComponent {
    constructor(vnode) {
        this.activeButton = 'inventory';
    }
    view() {
        const ab = this.activeButton;
        return m('.left.pure-u-5-24', [
            m('.tablist', [
                m('.tab' + (ab === 'inventory' ? '.tab-active' : ''), {
                    onclick: () => this.activeButton = 'inventory'
                }, 'Inventory'),
                m('.tab' + (ab === 'cities' ? '.tab-active' : ''), {
                    onclick: () => this.activeButton = 'cities',
                    hidden: ViewModel.cities.length <= 1
                }, 'Cities'),
            ]),
            this.activeButton === 'inventory' ? m(InventoryComponent) : m(CitiesComponent),
        ]);
    }
}

class InventoryComponent {
    constructor(vnode) {
    }

    view() {
        return m('.inventory', ViewModel.currentCity.inventory.map(it => {
            return m(ItemComponent, {item: it});
        }));
    }
}

class ItemComponent {
    constructor(vnode) {
        this.item = vnode.attrs.item;
    }

    view() {
        return m('.item', [
            this.item.name,
            m('span.qty', this.item.qty),
        ]);
    }
}

class CitiesComponent {
    constructor(vnode) {
    }

    view() {
        return m('.cities', ViewModel.cities.map(it => {
            return m(CityComponent, {city: it});
        }));
    }
}

class CityComponent {
    constructor(vnode) {
        this.city = vnode.attrs.city;
    }

    view() {
        return m('.city' + (ViewModel.currentCity.id === this.city.id ? '.active' : ''), {
            onclick: () => ViewModel.currentCity = this.city,
        }, [
            this.city.name,
            m('span.pop', `L: ${this.city.landUsed} P: ${this.city.citizens.length}`)
        ]);
    }
}

/**
 * The center contains tabs for the list of buildings in the city, and the citizen list.
 */
class CenterComponent {
    constructor(vnode) {
        this.activeButton = 'buildings';
    }
    view() {
        const ab = this.activeButton;
        const cc = ViewModel.currentCity;

        return m('.center.pure-u-11-24', [
            m('.tablist', [
                m('.tabtitle', ViewModel.currentCity.name + ':'),
                m('.tab' + (ab === 'buildings' ? '.tab-active' : ''), {
                    onclick: () => this.activeButton = 'buildings',
                    title: `Land Used: ${cc.landUsed}\nLand Available: ${cc.landAvailable}\nTotal Land: ${cc.landTotal}`
                }, `Buildings (${cc.landUsed}/${cc.landAvailable}/${cc.landTotal})`),
                m('.tab' + (ab === 'citizens' ? '.tab-active' : ''), {
                    onclick: () => this.activeButton = 'citizens',
                    hidden: ViewModel.currentCity.citizens.length === 0,
                    title: `Citizens: ${cc.citizens.length}\nMax Population: ${cc.populationCap}`
                }, `Citizens (${cc.citizens.length}/${cc.populationCap})`)
            ])
        ]);
    }
}

/**
 * The right contains info for the selected object, either a building or a citizen.
 */
class RightSideComponent {
    constructor(vnode) {
    }
    view() {
        return m('.right.pure-u-1-3', 'Right side');
    }
}

class HeaderComponent {
    constructor(vnode) {
    }
    view() {
        return m('.top.pure-u-1', 'Era, a relaxing civ incremental');
    }
}

class RootComponent {
    constructor(vnode) {

    }

    view() {
        return m('main.pure-g', [
            m(HeaderComponent),
            m(LeftSideComponent),
            m(CenterComponent),
            m(RightSideComponent)
        ]);
    }
}

m.mount(document.body, RootComponent);