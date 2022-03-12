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
  .long: expected log pointwise predictive density
  .tex: \mathrm{elpd}(M_A | y)
  _loo
    .long: LOO-estimate of the elpd
    .tex: \widehat{\mathrm{elpd}}_\mathrm{LOO}(M_A | y)
  _diff
    .long: pairwise elpd difference
    .tex: \mathrm{elpd}(M_A, M_B | y)
    _loo
      .long: LOO-estimate of the elpd difference
      .tex: \widehat{\mathrm{elpd}}_\mathrm{LOO}(M_A, M_B | y)
      _se
        .long: standard error estimate of the LOO-estimate of the elpd difference
        .tex: \widehat{\mathrm{SE}}_\mathrm{LOO}(M_A, M_B | y)
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
      .tex: \mathrm{sv\_elpd}_\mathrm{LOO}(M_A | y)
M_inf
  .long: "encompassing model"
  .tex: M_{inf}
inf
  .tex: \infty
y
  .long: data realization
  .tex: y
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
```
# Your goal

Show that you can write a "minipaper", i.e. a report with the same structure and quality as a paper but with less content. Preliminary structure and possible content below.

# To select or not to select

**NOTATION MAY HAVE TO BE ADAPTED!**

**FOR NOW EVERYTHING ONLY FOR TWO MODELS**

## Introduction

Correctly introduce (with references where appropriate) and explain (as much as needed)
* y.intro and y_rv.intro,
* elpd.intro,
* elpd_diff.intro,
* elpd_loo.intro,
* elpd_diff_loo.intro,
* elpd_diff_loo_se.intro,
* sv_elpd_diff_loo.intro including
  * the normal ansatz and
  * the Bayesian Bootstrap ansatz,
* stacking.intro,
* results from Sivula20, Yao18 and Yao21,
* connections between elpd_diff_loo and sv_elpd_diff_loo weights,
* reasons why elpd_diff_loo ranking can differ from sv_elpd_diff_loo ranking,


and anything else which will be used / needed.

## Methods

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
  * RMSE.intro of parameter estimates and/or
  * other metrics
* visualized with (x,y,color) corresponding to e.g.
  * (beta, metric, method)
  * and more.

## Results

* Give recommendations how to interpret

## Discussion

TBD
