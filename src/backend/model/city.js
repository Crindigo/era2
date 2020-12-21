export class City
{

}

export class BuildingClass
{
    constructor() {
        // Each building has a list of upgrades that can be applied to it. The upgrades can be locked
        // behind research, and have unlock costs attached.
        this.upgrades = [];

        // Buildings can have operators that manage it and automatically process work.
        this.maxOperators = 0;

        // How much land this building requires.
        this.landUsage = 1;

        // How much this building adds to max population. In Town Center, can enable/disable pop growth.
        this.populationExpansion = 0;

        // Buildings can also store arbitrary data, like a farm storing its crops, fertilizer, irrigation status.
        // a FarmClass class could have a method for creating default farms, with those properties in it.

        // UI might be tricky. Rendering upgrade buttons and citizen select boxes could be standard at least.
        // Use mithril.js, can create html with code.

        // Jotting down housing note. Want to have assigned housing somehow, with the ability to upgrade houses
        // which apply bonuses to people living there.
    }
}