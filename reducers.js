export const GET_ARMORS = 'dauntless/armors/LOAD';
export const GET_ARMORS_SUCCESS = 'dauntless/armors/LOAD_SUCCESS';
export const GET_ARMORS_FAIL = 'dauntless/armors/LOAD_FAIL';

export const GET_ARMOR_DETAIL = 'dauntless/armor/LOAD';

export const GET_WEAPONS = 'dauntless/weapons/LOAD';
export const GET_WEAPONS_SUCCESS = 'dauntless/weapons/LOAD_SUCCESS';
export const GET_WEAPONS_FAIL = 'dauntless/weapons/LOAD_FAIL';

export const GET_WEAPON_DETAIL = 'dauntless/weapon/LOAD';

export const SET_GEAR_SET_PIECE = 'dauntless/gearSet/UPDATE'
export const GET_GEAR_SET = 'dauntless/gearSet/LIST'

export default function reducer(state = { armors: [], selectedArmor: {}, weapons: [], selectedWeapon: [], gearSet: {} }, action) {
  switch (action.type) {
    case GET_ARMORS:
      return { ...state, loading: true };
    case GET_ARMORS_SUCCESS: {
      return { ...state, loading: false, armors: action.payload.data };
    }
    case GET_ARMORS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching armors'
      };
    case GET_ARMOR_DETAIL: {
      return { ...state, selectedArmor: state.armors.find((armor) => armor.id == action.payload.id)}
    }
    case GET_WEAPONS:
      return { ...state, loading: true };
    case GET_WEAPONS_SUCCESS: {
      return { ...state, loading: false, weapons: action.payload.data };
    }
    case GET_WEAPONS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching weapons'
      };
    case GET_WEAPON_DETAIL: {
      return { ...state, selectedWeapon: state.weapons.find((weapon) => weapon.id == action.payload.id) }
    }
    case SET_GEAR_SET_PIECE: {
      let gearSet = Object.assign({}, state.gearSet);
      gearSet[action.payload.slot] = action.payload.item
      return {
        ...state,
        gearSet
      }
    }
    default:
      return state;
  }
}

export function listArmors() {
  return {
    type: GET_ARMORS,
    payload: {
      request: {
        url: `/armors.json`
      }
    }
  };
}

export function getArmorDetail(id) {
  return {
    type: GET_ARMOR_DETAIL,
    payload: {
      id: id
    }
  }
}

export function listWeapons() {
  return {
    type: GET_WEAPONS,
    payload: {
      request: {
        url: `/weapons.json`
      }
    }
  };
}

export function getWeaponDetail(id) {
  return {
    type: GET_WEAPON_DETAIL,
    payload: {
      id: id
    }
  }
}

export function setGearSetPiece(slot, item) {
  return {
    type: SET_GEAR_SET_PIECE,
    payload: {
      slot: slot,
      item: item
    }
  }
}

export function listGearSet() {
  return {
    type: GET_GEAR_SET,
    payload: {}
  };
}