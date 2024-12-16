import { Low } from "lowdb";
import lodash from "lodash";

export default class DbWithLodash<T> extends Low<T> {
  // Extend LowDB class with a new `chain` field
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}
