### Definitions:

#### ELPD

\[\mathrm{elpd\_diff\_loo} ( A , B | y ) = \sum_{i} {\mathrm{elpd\_diffs\_loo}}_{i} ( A , B | y )\quad{(1)}\]

\[{\mathrm{elpd\_diffs\_loo}}_{i} ( A , B | y ) = \mathrm{Log} \, p ( {y}_{i} | A , {y}_{- i} ) - \mathrm{Log} \, p ( {y}_{i} | B , {y}_{- i} )\quad{(2)}\]

\[\mathrm{elpd\_se\_loo} ( A , B | y ) = \dots\quad{(3)}\]

#### weights for many models

\[{w}_{k , \mathrm{method}} = \mathbb{E} ( \mathrm{softmax} ( {\mathrm{elpd}}_{\mathrm{method}} ) )\quad{(4)}\]

\[\mathrm{softmax} ( x ) = \frac{\mathrm{Exp} ( x )}{\sum_{i} \mathrm{Exp} ( {x}_{i} )}\quad{(5)}\]

#### weights for two model case
\[{w}_{A , \mathrm{method}} = \mathbb{E} ( \mathrm{logistic} ( {\mathrm{elpd\_diff}}_{\mathrm{method}} ) )\quad{(6)}\]
\[\mathrm{logistic} ( x ) = \frac{1}{( 1 + \mathrm{Exp} ( - x ) )}\quad{(7:\text{def_logistic})}\]

#### methods

* The "point-estimate"-method uses \[P ( {\mathrm{elpd\_diff}}_{\mathrm{point}} = \mathrm{elpd\_diff\_loo} ) = 1\quad{(8)}\]
* The "normal-approximation"-method  uses \[\mathrm{Dist} ( {\mathrm{elpd\_diff}}_{\mathrm{SE}} ) = \mathcal{N} ( \mathrm{elpd\_diff\_loo} , \mathrm{elpd\_se\_loo} )\quad{(9)}\]
* The "Bayesian-bootstrap"-method uses \[{\mathrm{elpd\_diff}}_{\mathrm{BB}} = n \, \left\langle{W}_{\mathrm{BB}},\mathrm{elpd\_diffs\_loo}\right\rangle\quad{(10)}\] with \[\mathrm{Dist} ( {W}_{\mathrm{BB}} ) = \mathrm{Dir} ( {\mathbf{1}}_{n} )\quad{(11)}\]

#### results

* We chose the definitions such that \[{w}_{A , \mathrm{point}} = \mathrm{logistic} ( \mathrm{elpd\_diff\_loo} )\quad{(12)}\]
* We can bound \({w}_{A , \mathrm{SE}}\) using \({w}_{A , \mathrm{point}}\) if \({w}_{A , \mathrm{point}} < \frac{1}{2}\): \[{w}_{A , \mathrm{point}} < {w}_{A , \mathrm{SE}} < \frac{1}{2}\quad{(13:\text{bound_SE})}\] or equivalently if \({w}_{A , \mathrm{SE}} > \frac{1}{2}\).
* Generally we *cannot* bound \({w}_{A , \mathrm{BB}}\) using \({w}_{A , \mathrm{point}}\) or \({w}_{A , \mathrm{SE}}\), even though
in practice we can Expect \({w}_{a , \mathrm{BB}}\) to be closer to \(\frac{1}{2}\) than \({w}_{A , \mathrm{point}}\).

#### proofs

* Direct computation.
* See [below](#proof-for-the-normal-approximation).
* Counterexamples can be constructed (for now see Slack).

#### proof for the normal approximation

The proof of \(\mathrm{bound\_SE}\) consists of two parts:

* [First we show](#proof-of-bound-fexefx) that given
  * a real number \(\mu\),
  * a function \(f : \mathbb{R} \rightarrow \mathbb{R}\) that satisfies \[2 \, f ( \mu ) < f ( \mu - x ) + f ( \mu + x )\quad{(14:\text{bound_f})}\] for all positive numbers \(x > 0\) and
  * an RV \(X\) with mean \(\mu\) and PDF \(p : \mathbb{R} \rightarrow \mathbb{R}^+_0\) that satisfies \[p ( \mu - x ) = p ( \mu + x )\quad{(15:\text{symm_p})}\] for all positive numbers \(x > 0\),
  * the inequality \[f ( \mathbb{E} ( X ) ) < \mathbb{E} ( f ( X ) )\quad{(16:\text{bound_fexefx})}\] holds (assuming \(\mathbb{E} ( f ( X ) )\) "exists" which it does in our case).
* [Next we show](#proof-of-bound-f) that the logistic function satisfies \(\mathrm{bound\_f}\) for \(\mu < 0\).

As the normal distribution is symmetric around its mean \(\mu\), the PDF of \({\mathrm{elpd\_diff}}_{\mathrm{SE}}\)
satisfies \(\mathrm{symm\_p}\) and because \(\mu\) above is just \(\mathrm{elpd\_diff\_loo}\), which is also the mean
of \({\mathrm{elpd\_diff}}_{\mathrm{SE}}\), all other preconditions of the first part are already satisfied for \(\mathrm{bound\_SE}\).

<a name="proof-of-bound-fexefx"></a>
#### proof of \(\mathrm{bound\_fexefx}\)

Using the definition of the expectation
yields for the right hand side of \(\mathrm{bound\_fexefx}\) that \[\mathbb{E} ( f ( X ) ) = \int_{\mathbb{R}} f ( x ) \, p ( x ) \, \mathrm{d}x\quad{(17)}\]
A linear change of variables yields \[\mathbb{E} ( f ( X ) ) = \int_{\mathbb{R}} f ( \mu + x ) \, p ( \mu + x ) \, \mathrm{d}x\quad{(18)}\] and "folding the integral at \(x = 0\)" yields \[\mathbb{E} ( f ( X ) ) = \int_{\mathbb{R}^+_0} f ( \mu - x ) \, p ( \mu - x ) + f ( \mu + x ) \, p ( \mu + x ) \, \mathrm{d}x\quad{(19)}\] which together with \(\mathrm{symm\_p}\) yields \[\mathbb{E} ( f ( X ) ) = \int_{\mathbb{R}^+_0} ( f ( \mu - x ) + f ( \mu + x ) ) \, p ( \mu + x ) \, \mathrm{d}x\quad{(20:\text{rhs_final})}\]
For the left hand side of \(\mathrm{bound\_fexefx}\) we have that \[f ( \mathbb{E} ( X ) ) = f ( \mu )\quad{(21)}\] but also \[f ( \mathbb{E} ( X ) ) = \int_{\mathbb{R}} f ( \mu ) \, p ( x ) \, \mathrm{d}x\quad{(22)}\] because \(p\) integrates to one as it is a PDF.
After the same steps that were performed for the right hand side, we get \[f ( \mathbb{E} ( X ) ) = \int_{\mathbb{R}^+_0} 2 \, f ( \mu ) \, p ( \mu + x ) \, \mathrm{d}x\quad{(23:\text{lhs_final})}\]
Comparing \(\mathrm{lhs\_final}\) and \(\mathrm{rhs\_final}\) we note that if \(\mathrm{bound\_f}\) holds,
then \(\mathrm{bound\_fexefx}\) holds because then the integrand of the difference has a sign.

<a name="proof-of-bound-f"></a>
#### proof of \(\mathrm{bound\_f}\)

We now show that \[2 \, \mathrm{logistic} ( \mu ) < \mathrm{logistic} ( \mu - x ) + \mathrm{logistic} ( \mu + x )\quad{(24:\text{bound_logistic})}\] for negative \(\mu < 0\) and positive \(x > 0\). Using \(\mathrm{def\_logistic}\) and combining
all fractions to one we get \[\mathrm{logistic} ( \mu - x ) + \mathrm{logistic} ( \mu + x ) - 2 \, \mathrm{logistic} ( \mu ) = \frac{\mathrm{Num} ( \mu , x )}{\mathrm{Den} ( \mu , x )}\quad{(25)}\] with \[\mathrm{Num} ( \mu , x ) := \mathrm{Dt} ( \mu - x ) \, \mathrm{Dt} ( \mu ) + \mathrm{Dt} ( \mu + x ) \, \mathrm{Dt} ( \mu ) - 2 \, \mathrm{Dt} ( \mu - x ) \, \mathrm{Dt} ( \mu + x )\quad{(26)}\] and \[\mathrm{Den} ( \mu , x ) := \mathrm{Dt} ( \mu + x ) \, \mathrm{Dt} ( \mu - x ) \, \mathrm{Dt} ( \mu ) > 0\quad{(27)}\] using the abbreviation \(\mathrm{Dt} ( x ) := 1 + \mathrm{Exp} ( - x )\).
To show \(\mathrm{bound\_logistic}\) it is thus sufficient to show that \(\mathrm{Num} ( \mu , x ) > 0\)
for all \(\mu < 0 < x\).

Expanding all products in the
definition of \(\mathrm{Num} ( \mu , x )\) yields \[\mathrm{Num} ( \mu , x ) = + 2 \, \mathrm{Exp} ( - \mu ) - 2 \, \mathrm{Exp} ( - 2 \, \mu ) + \mathrm{Exp} ( - 2 \, \mu + x ) - \mathrm{Exp} ( - \mu + x ) + \mathrm{Exp} ( - 2 \, \mu - x ) - \mathrm{Exp} ( - \mu - x )\quad{(28)}\]
As \(\mathrm{Exp} ( \mu ) > 0\) for all real numbers \(\mu\) we get \[\mathrm{Num} ( \mu , x ) > 0 \text{ if and only if } \mathrm{Nt} ( \mu , x ) := \mathrm{Num} ( \mu , x ) \, \mathrm{Exp} ( \mu ) > 0\quad{(29)}\]
We get \[\mathrm{Nt} ( \mu , x ) = 2 - 2 \, \mathrm{Exp} ( - \mu ) + \mathrm{Exp} ( - \mu + x ) - \mathrm{Exp} ( x ) + \mathrm{Exp} ( - \mu - x ) - \mathrm{Exp} ( - x )\quad{(30)}\] Direct computation reveals that \(\mathrm{Nt} ( 0 , x ) = 0\).
Furthermore we can compute \[\frac{\mathrm{d}\mathrm{Nt}}{\mathrm{d}\mu} ( \mu , x ) = + 2 \, \mathrm{Exp} ( - \mu ) - \mathrm{Exp} ( - \mu + x ) - \mathrm{Exp} ( - \mu - x ) = \mathrm{Exp} ( - \mu ) \, ( 2 - \mathrm{Exp} ( + x ) - \mathrm{Exp} ( - x ) )\quad{(31)}\]
[Elementary analysis](https://www.wolframalpha.com/input?i=2-Exp%5Bx%5D-Exp%5B-x%5D) reveals that \[\frac{\mathrm{d}\mathrm{Nt}}{\mathrm{d}\mu} ( \mu , x ) \leq 0\quad{(32)}\] with the inequality being strict if \(x \neq 0\). From the
  [fundamental theorem of calculus](https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus#Corollary)
we have that \[\mathrm{Nt} ( \mu , x ) = \mathrm{Nt} ( 0 , x ) + \int_{( 0 , \mu )} \frac{\mathrm{d}\mathrm{Nt}}{\mathrm{d}\mu} ( z , x ) \, \mathrm{d}z\quad{(33)}\] for any real number mu. Using
 \(\frac{\mathrm{d}\mathrm{Nt}}{\mathrm{d}\mu} ( z , x ) \leq 0\) almost everywhere,
 \(\mathrm{Nt} ( 0 , x ) = 0\) and
 \(\mu < 0\)
we can bound \[\mathrm{Nt} ( \mu , x ) > \mathrm{Nt} ( 0 , x ) - \mu \, \varepsilon ( \mu , x ) > 0\quad{(34)}\] for some \(\varepsilon ( \mu , x ) > 0\).
