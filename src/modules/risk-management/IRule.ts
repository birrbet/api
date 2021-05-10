export interface IRule {
  isApplicable(state);
  applyTo(state);
}

// define rules in json format
// then rry to execute them in this class
export class Evaluator {
  constructor(private rules: Array<IRule>) {}
  execute(state) {
    this.rules.forEach((rule) => {
      if (rule.isApplicable(state)) {
        const result = rule.applyTo(state);
      }
    });
  }
}
