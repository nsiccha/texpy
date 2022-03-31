## Definitions:

### ELPD

{
  elpd_diff_loo(A, B | y) = Sum(elpd_diffs_loo[i](A, B | y), i)
}

{
  elpd_diffs_loo[i](A, B | y) = Log @ p(y[i] | A, y[-i]) - Log @ p(y[i] | B, y[-i])
}

{
  elpd_se_loo(A, B | y) = dots
}

### weights for many models

{
  w[k,method] = E(softmax(elpd[method]))
}

{
  softmax(x) = Exp(x) / Sum(Exp(x[i]), i)
}

### weights for two model case
{
  w[A,method] = E(logistic(elpd_diff[method]))
}
{def_logistic:
  logistic(x) = 1 / (1 + Exp(-x))
}

### methods

* The "point-estimate"-method uses {
  P(elpd_diff[point] = elpd_diff_loo) = 1
}
* The "normal-approximation"-method  uses {
  Dist(elpd_diff[SE]) = Normal(elpd_diff_loo, elpd_se_loo)
}
* The "Bayesian-bootstrap"-method uses {
  elpd_diff[BB] = n * <W[BB], elpd_diffs_loo>
} with {
  Dist(W[BB]) = Dir(ones[n]).
}

### results

* We chose the definitions such that {
  w[A,point] = logistic(elpd_diff_loo).
}
* We can bound {w[A,SE]} using {w[A,point]} if {w[A,point] < 1/2}: {bound_SE:
  w[A,point] < w[A,SE] < 1/2
} or equivalently if {w[A,point] > 1/2}.
* Generally we *cannot* bound {w[A,BB]} using {w[A,point]} or {w[A,SE]}, even though
in practice we can expect {w[a,BB]} to be closer to {1/2} than {w[A,point]}.

### proofs

* Direct computation.
* See [below](#proof-for-the-normal-approximation).
* Counterexamples can be constructed (for now see Slack).

### proof for the normal approximation

The proof of {bound_SE} consists of two parts:

* [First we show](#proof-of-bound_fexefx) that given
  * a real number {mu},
  * a function {f :: reals -> reals} that satisfies {bound_f:
    2 * f(mu) < f(mu - x) + f(mu + x)
  } for all positive numbers {x > 0} and
  * an RV {X} with mean {mu} and PDF {p :: reals -> nonnegative_reals} that satisfies {symm_p:
    p(mu - x) = p(mu + x)
  } for all positive numbers {x > 0},
  * the inequality {bound_fexefx:
    f(E(X)) < E(f(X))
  } holds (assuming {E(f(X))} "exists" which it does in our case).
* [Next we show](#proof-of-bound_f) that the logistic function satisfies {bound_f} for {mu < 0}.

As the normal distribution is symmetric around its mean {mu}, the PDF of {elpd_diff[SE]}
satisfies {symm_p} and because {mu} above is just {elpd_diff_loo}, which is also the mean
of {elpd_diff[SE]}, all other preconditions of the first part are already satisfied for {bound_SE}.

### proof of bound_fexefx

Using the definition of the expectation
yields for the right hand side of {bound_fexefx} that {
  E(f(X)) = Integral(f(x)*p(x), x, reals).
}
A linear change of variables yields {
  E(f(X)) = Integral(f(mu+x)*p(mu+x), x, reals).
} We "fold the integral at {x=0}" (**making this step more explicit**),
by which we mean that we first rewrite {
  E(f(X)) = Integral(f(mu+x)*p(mu+x), x, reals)
    = Integral(f(mu+x)*p(mu+x), x, nonpositive_reals) + Integral(f(mu+x)*p(mu+x), x, nonnegative_reals)
} by splitting the integral at {x=0}. Next, we rewrite the first summand as {
  Integral(f(mu+x)*p(mu+x), x, nonpositive_reals) =
  Integral(f(mu-x)*p(mu-x), x, nonnegative_reals)
} using the linear change of variables {x -> -x} which changes
the integration domain {nonpositive_reals -> nonnegative_reals}
and the sign of {x} in {f(mu+x) -> f(mu-x)} and in {p(mu+x) -> p(mu-x)}
**without further assumptions** on {f} or {p}. Finally, we combine the integrals as {
  E(f(X)) = Integral(f(mu-x)*p(mu-x), x, nonnegative_reals) + Integral(f(mu+x)*p(mu+x), x, nonnegative_reals)
  = Integral(f(mu-x)*p(mu-x) + f(mu+x)*p(mu+x), x, nonnegative_reals)
} which together with {symm_p} yields {rhs_final:
  E(f(X)) = Integral((f(mu-x) + f(mu+x))*p(mu+x), x, nonnegative_reals).
}
For the left hand side of {bound_fexefx} we have that {
  f(E(X)) = f(mu)
} but also {
  f(E(X)) = Integral(f(mu)*p(x),x,reals)
} because {p} integrates to one as it is a PDF.
After the same steps that were performed for the right hand side, we get {lhs_final:
  f(E(X)) = Integral(2*f(mu)*p(mu+x),x,nonnegative_reals).
}
Comparing {lhs_final} and {rhs_final} we note that if {bound_f} holds,
then {bound_fexefx} holds because then the integrand of the difference has a sign.

### proof of bound_f

We now show that {bound_logistic:
  2 * logistic(mu) < logistic(mu-x) + logistic(mu+x)
} for negative {mu < 0} and positive {x > 0}. Using {def_logistic} and combining
all fractions to one we get {
  logistic(mu-x)+logistic(mu+x) - 2 * logistic(mu) = Num(mu,x)/Den(mu,x)
} with {
  Num(mu,x) := Dt(mu-x)*Dt(mu) + Dt(mu+x)*Dt(mu) - 2*Dt(mu-x)*Dt(mu+x)
} and {
  Den(mu,x) := Dt(mu+x)*Dt(mu-x)*Dt(mu) > 0
} using the abbreviation {Dt(x) := 1+Exp(-x)}.
To show {bound_logistic} it is thus sufficient to show that {Num(mu,x) > 0}
for all {mu < 0 < x}.

Expanding all products in the
definition of {Num(mu,x)} yields {
  Num(mu,x) =
    + 2 * Exp(-mu)
    - 2 * Exp(-2*mu)
    + Exp(-2 * mu + x)
    - Exp(-mu+x)
    + Exp(-2 * mu - x)
    - Exp(-mu - x).
}
As {Exp(mu) > 0} for all real numbers {mu} we get {
 Num(mu,x) > 0
  iff
 Nt(mu,x) := Num(mu,x)*Exp(mu) > 0.
}
We get {
 Nt(mu, x) =
   2
   - 2 * Exp(-mu)
   + Exp(-mu+x)
   - Exp(x)
   + Exp(-mu - x)
   - Exp(-x).
} Direct computation reveals that {Nt(0,x) = 0}.
Furthermore we can compute {
 Diff(Nt,mu)(mu,x) =
   + 2 * Exp(-mu)
   - Exp(-mu + x)
   - Exp(-mu - x) =
   Exp(-mu) * (
     2 - Exp(+x) - Exp(-x)
   ).
}
[Elementary analysis](https://www.wolframalpha.com/input?i=2-Exp%5Bx%5D-Exp%5B-x%5D) reveals that {
 Diff(Nt,mu)(mu,x) <= 0
} with the inequality being strict if {x != 0}. From the
  [fundamental theorem of calculus](https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus#Corollary)
we have that {
 Nt(mu,x) = Nt(0,x) + Integral(Diff(Nt,mu)(z,x), z, (0, mu))
} for any real number mu. Using
 {Diff(Nt,mu)(z,x) <= 0} almost everywhere,
 {Nt(0,x) = 0} and
 {mu < 0}
we can bound {
 Nt(mu, x) > Nt(0,x) - mu * eps(mu, x) > 0
} for some {eps(mu, x) > 0}.
