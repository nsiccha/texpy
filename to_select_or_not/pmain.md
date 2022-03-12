
# Your goal

Show that you can write a "minipaper", i.e. a report with the same structure and quality as a paper but with less content. Preliminary structure and possible content below.

# To select or not to select

**NOTATION MAY HAVE TO BE ADAPTED!**

**FOR NOW EVERYTHING ONLY FOR TWO MODELS**

## Introduction

Correctly introduce (with references where appropriate) and explain (as much as needed)
* data realization $y$ and data random vector $Y$,
* expected log pointwise predictive density $\mathrm{elpd}(M_A | $y$)$,
* pairwise elpd difference $\mathrm{elpd}(M_A, M_B | $y$)$,
* LOO-estimate of the elpd $\widehat{\mathrm{elpd}}_\mathrm{LOO}(M_A | $y$)$,
* LOO-estimate of the elpd difference $\widehat{\mathrm{elpd}}_\mathrm{LOO}(M_A, M_B | $y$)$,
* standard error estimate of the LOO-estimate of the elpd difference $\widehat{\mathrm{SE}}_\mathrm{LOO}(M_A, M_B | $y$)$,
* random variable modeling the true elpd difference using LOO estimates $\mathrm{sv\_elpd}_\mathrm{LOO}(M_A | $y$)$ including
  * the normal ansatz and
  * the Bayesian Bootstrap ansatz,
* stacking (of predictive distributions, see [[Yao18]](http://dx.doi.org/10.1214/17-BA1091) and [[Yao21]](http://dx.doi.org/10.1214/21-BA1287)),
* results from [[Sivula20]](http://dx.doi.org/10.48550/arXiv.2008.10296), [[Yao18]](http://dx.doi.org/10.1214/17-BA1091) and [[Yao21]](http://dx.doi.org/10.1214/21-BA1287),
* connections between $\widehat{\mathrm{elpd}}_\mathrm{LOO}(M_A, M_B | $y$)$ and $\mathrm{sv\_elpd}_\mathrm{LOO}(M_A | $y$)$ weights,
* reasons why $\widehat{\mathrm{elpd}}_\mathrm{LOO}(M_A, M_B | $y$)$ ranking can differ from $\mathrm{sv\_elpd}_\mathrm{LOO}(M_A | $y$)$ ranking,


and anything else which will be used / needed.

## Methods

Compare
* using
  * simulations or
  * theory where possible
* for non-zero but potentially small model difference $\beta$
* different methods to combine a given set of model candidates, including using weights from
    * BMA,
    * BMA+,
    * stacking,
    * model selection using different criteria, e.g. use the smaller model
      * always,
      * if BF < delta (**maybe**),
      * if ...
      * never,
* for different model candidate sets, including
  * $y$ $\sim$ 1 vs $y$ $\sim$ x with
    * wide prior on model difference or
    * (R)HS prior on model difference
  * $y$ $\sim$ x1+x2+x3+x4+x5 vs $y$ $\sim$ x1+x2+x3+x4+x5+x6
  * $y$ $\sim$ x vs $y$ $\sim$ s(x)
  * $y$ $\sim$ x vs $y$ $\sim$ x + (x|g)
  * $y$ $\sim$ x with
    * family=normal vs family=t or
    * family=poisson vs family=negbin
  * more than two model candidates (**later**), including
    * $y$ $\sim$ 1 vs $y$ $\sim$ x1 vs $y$ $\sim$ x2 vs $y$ $\sim$ x1 + x2 with correlating x1 and x2,
    * $y$ $\sim$ x1 vs $y$ $\sim$ x2 vs $y$ $\sim$ x1 + x2 vs $y$ $\sim$ x1 + x2 + x1*x2 with an interaction term which correlates with main effects,
  * other models as e.g. in [[Sivula20]](http://dx.doi.org/10.48550/arXiv.2008.10296),
* using different metrics, including
  * (loss of) predictive accuracy as measured by the expected log pointwise predictive density $\mathrm{elpd}(M_A | $y$)$,
  * root mean square error (RMSE) of parameter estimates and/or
  * other metrics
* visualized with (x,$y$,color) corresponding to e.g.
  * (beta, metric, method)
  * and more.

## Results

* Give recommendations how to interpret

## Discussion

TBD