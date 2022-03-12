```
jrnold
  .disclaimer: according to jrnold.mc BUT FIND ACTUAL REFERENCE!
  .mc: https://jrnold.github.io/bayesian_notes/model-comparison.html
BMA
  .long: Bayesian model averaging
Yao18
  .doi: 10.1214/17-BA1091
Yao21
  .doi: 10.1214/21-BA1287
Sivula20
  .doi: 10.48550/arXiv.2008.10296
softmax
  .tex: \mathrm{softmax}
  (x_): exp(x)/sum(exp(x))
E
  .name: expectation
elpd
  .long: true expected log pointwise predictive density
  .tex: \mathrm{elpd}(M_A | y)
  _loo
    .long: LOO-estimate of the elpd
    .tex: \widehat{\mathrm{elpd}}_\mathrm{LOO}(M_A | y)
    _weights: LOO-weights
    _normal_weights: LOO-SE weights
    _bootstrap_weights: LOO-BB weights
  _diff
    .long: pairwise elpd difference
    .tex: \mathrm{elpd}(M_A, M_B | y)
    _loo
      .long: LOO-estimate of the elpd difference
      .tex: \widehat{\mathrm{elpd}}_\mathrm{LOO}(M_A, M_B | y)
      _se
        .long: standard error estimate of the LOO-estimate of the elpd difference
        .tex: \widehat{\mathrm{SE}}_\mathrm{LOO}(M_A, M_B | y)
    _pdelta
      .long: probability of elpd_diff > delta
      .tex: P(\mathrm{elpd}(M_A, M_B | y) > \delta)
sv_elpd
  .tex: \mathrm{sv\_elpd}
  _loo
    .long: random variable modeling the true elpd using LOO
    .tex: \mathrm{sv\_elpd}_\mathrm{LOO}(M_A | y)
  _diff
    .long: random variable modeling the true elpd difference
    .tex: \mathrm{sv\_elpd}(M_A, M_B | y)
    _loo
      .long: random variable modeling the true elpd difference using LOO estimates
      .tex: \mathrm{sv\_elpd}_\mathrm{LOO}(M_A, M_B | y)
M_inf
  .long: "encompassing model"
  .tex: M_{inf}
inf
  .tex: \infty
y
  .long: data realization
  .texxx: y
  _rv
    .long: data random vector
    .tex: Y
~
  .tex: \sim
Normal
  .tex: \mathcal{N}
stacking
  .intro: stacking (of predictive distributions, see Yao18 and Yao21)
RMSE
  .long: root mean square error
models
  _set
    .tex: \mathbb{M}
    .long: set of model candidates
model
  _difference
    .tex: \beta
    .long: model difference
PPC
  .long: posterior predictive check
CV
  .long: cross-validation
BF
  .long: Bayes factor
SBC
  .long: simulation based calibration
LOO
  .long: leave-one-out
  _PIT
    .long: LOO predictive distribution calibration
```
# Summary

* Based on what we have seen so far, at the moment renewal of your contract is more unlikely than likely, but we are giving you a chance to change this.
* The renewal decision will be made in April, that is about 6 months before the end of current contract, so that you will have time for arrangements if the contract will not be renewed. The decision will be heavily influenced by what you can show us until then.
* So far you have had two main tasks:
  1) help with LOO-uncertainty paper,
  2) first author the continuation paper.
* We have allowed you to have side projects, which seems to have been a mistake as you have now been doing many projects (many of them not related to the funding), but none of them demonstrate that you would be able to finish papers or thesis.
* Recently you have made it more clear that you are not motivated to do 2, and we did first discuss with you that you could do something slightly different. As we're now running out of time, we need to choose a topic that is familiar for you and related to the funding.
* We want you to write a "minipaper" that
  * showcases you can write a coherent "story" that makes sense from beginning till end,
  * quality- and structurewise should be like a paper,
  * from the amount of content need not be like a paper,
  * can have theory (proofs), but we highly recommend you focus on simulations as you already have done similar simulations and it seems like you can get stuck with the proofs,
  * ideally forms the basis for an actual paper.
* It does not matter if the results themselves are not interesting enough to be included in a paper.
* Before hiring you, we also discussed that you need to improve your English skills. This minipaper doesn't need to be perfect, but it should show that you have improved your English.
* You can add content to the outline after we discuss this and if we agree that it makes sense.
* If you have any questions or problems you can always contact me.

## Comments

* Please be careful with the notation!
* Please be careful with the definitions!
* Please avoid unnecessary "Definition", "Lemma" or "Theorem" blocks!
* Please be careful to appropriately reference sources!
* Please be careful when you make assertions!
* Please explain everything as simply and explicitly as possible to avoid ambiguity!
* Please be very careful with mathematical proofs!
* Comprehensively describe experimental settings!

## Overarching goal

**Empirically and (only if possible) theoretically validate and extend LOO recommendations that we can give users.**

**FOR NOW EVERYTHING ONLY FOR TWO MODELS**


Recommendations should include what to do if

* elpd_diff_loo is small and
  * elpd_diff_loo_se is small or
  * elpd_diff_loo_se is large
* elpd_diff_loo is large and
  * elpd_diff_loo_se is small or
  * elpd_diff_loo_se is large

and should include explanations why different methods may give different results.

You should compare
* in the setting of two (nested) models
* using simulations and theory (only if immediate!)
* different methods to weigh/rank/select models
  * elpd_diff_pdelta (for now $\delta=0$),
  * elpd_loo_weights,
  * elpd_loo_normal_weights and
  * elpd_loo_bootstrap_weights
* for different model sets (reuse your experiments from github!),
* and using different metrics
  * elpd.intro and
  * RMSE.intro of the parameter point estimate.

Please correctly introduce (with references where appropriate) and explain (as much as needed)

* elpd.intro,
* elpd_diff.intro,
* elpd_loo.intro,
* elpd_diff_loo.intro,
* elpd_diff_loo_se.intro,
* elpd_diff_pdelta.intro,
* elpd_loo_weights,
* elpd_loo_normal_weights,
* elpd_loo_bootstrap_weights,
* differences and connections between the different weights/rankings
* reasons why different methods give different rankings

and anything else which will be used / needed.

As discussed previously, if you notice any pattern that you believe could hold more generally, write this down as a conjecture! There is no need to proof them, especially if this may take an excessive amount of time!

# Practical LOO for model comparison


## Introduction


## Methods

* Models:
  * Experiments from your github (these could be enough)
* Conjectures (simulations reveal a pattern which we might believe holds generally)
  * Unless proof is immediate, skip it

## Results

* elpd_diff < 4: Models are similar. What does this imply? (elpd and RMSE)

What are the cases when the difference between two models is small anyways, even if e.g. P(elpd > 0) is small.

* No stacking


* elpd_loo ranking vs sv_elpd_diff_loo weights/ranking

* if something is defined in the loo-uncertainty draft you can use it

* Validate and extend LOO recommendations
  * Questions and answers provided by Aki
* You don't need to invent anything
* If you can find additional patterns/connections that is good but not necessary.

* SNR + horsehoe + detection threshold (Juho Piironen)


## Discussion

TBD

## Sources with topics

**Authors in parenthesis are not necessarily originators of ideas**

### "To select or not to select" (Aki)

**WILL BE REMOVED FOR ASAEL**

Compare

* using
  * simulations or
  * theory where possible
* for non-zero but potentially small model_difference.long model_difference
* different methods to combine a given models_set.long, including using weights from
    * BMA,
    * BMA+,
    * stacking,
    * model selection using different criteria, e.g. use the smaller model
      * always,
      * if BF < delta (**maybe**),
      * if ...
      * never,
* for different model candidate sets, including
  * y ~ 1 vs y ~ x with
    * wide prior on model difference or
    * (R)HS prior on model difference
  * y ~ x1+x2+x3+x4+x5 vs y ~ x1+x2+x3+x4+x5+x6
  * y ~ x vs y ~ s(x)
  * y ~ x vs y ~ x + (x|g)
  * y ~ x with
    * family=normal vs family=t or
    * family=poisson vs family=negbin
  * more than two model candidates (**later**), including
    * y ~ 1 vs y ~ x1 vs y ~ x2 vs y ~ x1 + x2 with correlating x1 and x2,
    * y ~ x1 vs y ~ x2 vs y ~ x1 + x2 vs y ~ x1 + x2 + x1*x2 with an interaction term which correlates with main effects,
  * other models as e.g. in Sivula20,
* using different metrics, including
  * (loss of) predictive accuracy as measured by the elpd.long elpd,
  * RMSE.intro of parameter estimates and/or other metrics
* visualized with (x,y,color) corresponding to e.g.
  * (beta, metric, method) and more.

### Personal communcations (Aki)

* Plots (row, col, x, y, color):
  * (N/A, elpd_diff_loo_se, elpd_diff_loo, weight, method)
  * (N/A, metric (elpd/rmse), beta, metric, method)

### "Using uncertainty for model comparison" (Asael)

* elpd_diff_pdelta.intro
  * student-t approach
* show that w_a < w_a+ for w_a < 1/2 if w_a+ from normal approximation (**don't include**)
  * what if w_a+ from BB? (**don't include**)


### "Practical recommendations for considering the uncertainty in Bayesian model comparison with leave-one-out cross-validation" (Tuomas, Mans, Aki)

#### Introduction

* when can LOO model comparison be trusted?
* small number of models
* contrast LOO with BMA
* use sv_elpd_diff_loo weights

#### Practical recommendations

* Recommendations to assess whether LOO estimates are reliable
* theory and experiments => recommended thresholds
* elpd_diff_loo assumed to be exactly computed
* |elpd_diff_loo| < 4:
  * LOO estimates likely to have bias and/or high variance/skew
  * LOO can provide no reliable assessment
* |elpd_diff_loo| > 4:
  * assess diagnostics (k_hat, PPC, LOO-PIT) and sample size
  * if diagnostics for better model are fine, it's probably safe to pick (bad diagnostics usually lead to overoptimistic elpd_loo estimates)

#### Bayesian model averaging

* Introduce PBMA as an approximation to BMA and expression for weights
* Introduce PBMA+ (Yao18)
* Introduce sv_elpd_diff_loo weights and elpd_diff_pdelta (with $\delta = 0$)

#### Connection to BMA

* Quality of exposition degrades

##### Analysis of LOO-BB

* Discussion of plots (row, col, x, y, color):
  * (beta, n, w_a, w_a+ (BB), point density)
  * (beta, n, elpd_diff_pdelta, w_a+ (BB), point density)
  * (beta, n, w_a, w_a+ (BB), point density)

### "practical loo for model comparison" (Oriol, Osvaldo)

* How to select models?
  * no SBC, "just" simulations
  * effect of noisy data
  * how often do we pick which model as a function of
    * effect size,
    * sample size and more,
  * evaluate/compare behavior of using elpd/BMA/stacking:
    * is one method always superior/inferior?
    * does this depend on the goal?
    * "error" of choosing
      * the more complex model,
      * the model with best elpd,
      * model based on BF,
      * weights using BMA,
    * evaluate "selection performance"
      * can a hard threshold be defended? (unlikely)
    * evaluate predictive performance
    * when to use CV/predictive methods for model comparison?
      * m-open/-closed/-complete
      * examples when LOO works or does not work,
      * rule of thumb?
    * LOO diagnostics in practice?
      * bad k_hats?
    * LOO vs LOGO vs k-fold?
    * discuss (briefly) how LOO compares to BF
    * other scoring rules?

### "loo subworkflow" (Oriol, Osvaldo)

* PPC to discard grossly misspecified models (**don't include**)
* Sometimes CV is not needed. When, when not? (**don't include**)
* Large k-hat values? (**don't include**)
* Model expansion (Poisson=>negative binomial, Gaussian=>student t, pooled|unpooled=>hierarchical)
* When to choose simpler (special case of bigger) model? (**don't include**)
* Should LOO only be used for small number of models with clear difference? (**don't include**)
* SBC for elpd_loo (**don't include any of this**)
  * Investigate impact of k-hat distribution on reliability of rankings
  * elpd_diff rule of thumb? (e.g. elpd_diff > 4)
  * LOO vs LOGO vs k-fold
* LOO (**don't include any of this**)
  * Pitfalls/limits? How to fix/circumvent?:
    * Sample size?  
    * Non-robust models?
    * BF estimates?
  * Strengths
    * MCMC draws variation has little impact
    * built-in failure diagnostics
    * tool for model exploration
  * How do k-hats change when model complexity increases?
  * Plots (col,x,y,color):
    * color scale, elpd_loo_i, elpd_psisloo_i, k_hat_i
    * color scale, elpd_psis_loo_i, ml_smc(?), k_hat_i
    * y, k_hat_i, elpd_psis_loo_i or elpd_loo_i, None
