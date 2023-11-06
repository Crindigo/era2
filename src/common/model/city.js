/**
 * Common models should contain information important to both backend and UI. For example, configuration
 * like upgrades, how much land a building uses, how much population it gives, etc.
 *
 * The backend would extend this to add tick() and support methods for incrementing world state.
 *
 * The UI would extend this to add HTML rendering and events for the right column.
 *
 * On the UI, we'll need a way to associate the data we get from the backend to a class. If the data sent
 * back contains an identifying string like "TownCenter", we could have a registry that points TownCenter to
 * an instance of TownCenterUI. May need the same thing for vehicles, if we have a separate UI for those.
 */
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

  factory() {
    return {
      type: this,
      name: '',
      data: {}
      // possible data subkeys:
      // upgrades - array of string upgrade ids on the building
      // citizens - array of citizen ids assigned to building
    };
  }
}

/**
 * Building classes should just have single instances that get data passed into their tick function. The
 * data passed in is based on what's returned by factory().
 */
export class TownCenter extends BuildingClass
{
  constructor(props) {
    super(props);
    this.name = 'TownCenter';

    this.upgrades.push(new Upgrade('woodcutting', 'Woodcutting'));
    this.upgrades.push(new Upgrade('mining', 'Mining'));
  }
}

export class Upgrade
{
  constructor(id, name, requiredResearch = [], itemCosts = {}) {
    // thinking upgrades should not have logic in themselves, more like buildings will detect what upgrades
    // have been added and adjust their tick code accordingly.
    this.id = id;
    this.name = name;
    this.requiredResearch = requiredResearch;
    this.itemCosts = itemCosts;

    //this.requiredResearch = ['axes', 'stone_tools'];
    //this.itemCosts = {"flint": 10, "stick": 5};
  }
}