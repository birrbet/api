- i have to be asked before something in the app happens!

Rules engine design pattern

rule engine processes a set of rules and applies them to produce a result

a rule describes a condition and may calculate a value
```
interface IRule {
    isApplicable(state): boolean;
    applyTo(state): any;
}

class RuleA implements IRule {}

class Evaluator {
    constructor(private rules: Array<IRule>) {}
    execute(state) {
        this.rules.forEach((rule) => {
            if (rule.isApplicable(state)) {
                const result = rule,applyTo(state);
            }
        })
    }
}
```