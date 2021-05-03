import { IRule } from "../risk-management/IRule";

export class PlacementRule implements IRule {
    isApplicable(state: any): boolean {
        throw new Error("Method not implemented.");
    }
    applyTo(state: any) {
        throw new Error("Method not implemented.");
    }
}