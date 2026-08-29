# Robots and Jobs: Evidence from US Labor Markets (NBER Working Paper)

## Citation

Acemoglu, D., & Restrepo, P. (2017). *Robots and jobs: Evidence from US labor markets*
(NBER Working Paper No. 23285). National Bureau of Economic Research.
http://www.nber.org/papers/w23285

Publisher URL: http://www.nber.org/papers/w23285

Note on version summarized: this file summarizes the NBER working paper text itself, as printed
on the document's title and abstract pages ("Working Paper 23285," dated March 2017, JEL codes
J23 and J24). A revised version of this paper was later published as Acemoglu, D., & Restrepo, P.
(2020). Robots and jobs: Evidence from US labor markets. *Journal of Political Economy, 128*(6),
2188-2244. https://doi.org/10.1086/705716. The working paper and the published Journal of
Political Economy article are not necessarily identical in their reported coefficients, sample
periods, or table numbering; this summary was produced from the working-paper PDF only, and no
attempt was made to verify or reconcile its figures against the published JPE version. See
Limitations for further detail on this distinction.

## Metadata

Authors: Acemoglu, D., & Restrepo, P. · Year: 2017 · DOI: 10.1086/705716 · Publisher URL: http://www.nber.org/papers/w23285 · Derived at sub-step 2.6 from this file's own `## Citation` block; a field absent here is absent from that block, not inferred.

## Abstract

Estimates the equilibrium effect of the 1990-2007 rise in industrial robot use on US local labor
markets. Builds a task-based model in which robots and labor compete to perform tasks within an
industry, generating a displacement effect (robots directly substitute for workers) and a
productivity effect (lower costs raise industry and aggregate output and thus labor demand). Uses
this model to derive an "exposure to robots" measure at the commuting-zone level, built from the
national, industry-level penetration of robots (measured from International Federation of
Robotics, IFR, data) weighted by each commuting zone's baseline employment shares across
industries. Instruments the endogenous US measure of robot exposure with the exogenous spread of
robot use across nine other advanced economies. Reports large, precisely estimated negative
effects of robot exposure on both employment-to-population ratios and wages across 722 US
commuting zones between 1990 and 2007, robust to controls for Chinese and Mexican import
competition, offshoring, the decline of routine jobs, and other capital and information-technology
measures, and unaccompanied by any pre-1990 differential trend in the exposure measure.

## Summary

### Background and objective

The paper opens by situating the question against long-standing predictions of "technological
unemployment" (Keynes, 1930; Leontief, 1952) and against a contemporary literature that estimates
the technical *feasibility* of automating existing occupations rather than its realized labor-
market impact. It cites Frey and Osborne (2013), who classify 702 occupations by susceptibility to
automation and conclude that 47 percent of US employment is at risk over the next two decades; a
McKinsey estimate of 45 percent; and a World Bank estimate of 57 percent of OECD jobs (World
Development Report, 2016), against a much lower counter-estimate of about 9 percent from Arntz,
Gregory, and Zierahn (2016), who argue that task specialization within occupations is not fully
accounted for in the higher figures. The authors argue that feasibility studies do not correspond
to equilibrium labor-market outcomes, because realized automation depends on relative costs and
because other sectors, occupations, or productivity-driven expansions may offset direct job
displacement.

The stated objective is to move beyond feasibility studies and estimate the *equilibrium* impact
of one specific automation technology, industrial robots, on US local labor markets between 1990
and 2007. Industrial robots are defined, following the IFR (2014), as automatically controlled,
reprogrammable, multipurpose machines that do not require a human operator and can be
reprogrammed across tasks such as welding, painting, assembling, handling materials, or packaging;
this excludes single-purpose equipment (e.g., textile looms, elevators, cranes) and "dedicated
industrial robots" that perform only one industrial application, for which the IFR does not
collect data. The paper positions its closest precedent as Graetz and Michaels (2015), who use
cross-country, cross-industry variation in robot adoption and find that robots raise productivity
and wages while reducing low-skill employment; the present paper states that it uses a different,
local-labor-market empirical strategy built on the same IFR data source.

### Methods and scope

**Theoretical framework.** The paper presents a task-based model, building on Acemoglu and Autor
(2011) and Acemoglu and Restrepo (2016), in which each industry produces output by combining a
continuum of tasks indexed on [0, S]; robots can perform tasks [0, M_i] ("technologically
automated" tasks) while labor can perform any task, with robot productivity normalized to 1 and
labor productivity per task equal to a parameter gamma. Labor and robot supply in each commuting
zone are specified with a Frisch labor-supply elasticity of 1/epsilon and a robot-supply elasticity
of 1/eta. An "autarky" version of the model (commuting zones do not trade) yields Proposition 1
(partial equilibrium labor demand) and Proposition 2 (general equilibrium employment and wage
effects), decomposing the impact of increased robot penetration (dM_i) into a displacement effect
(negative) and a productivity effect made up of a price-productivity term and a scale-productivity
term (both positive, and increasing in the elasticity of substitution across industries, sigma). A
second version of the model adds trade between commuting zones (combining Armington 1969 and
Anderson 1979 style trade with the robot-task setup), introducing an additional elasticity of
substitution between varieties sourced from different commuting zones, lambda (with lambda >
sigma), which strengthens the price-productivity channel relative to autarky. Both versions yield
the same reduced-form empirical implication when M_i is small: employment and wage changes can be
linked to an "exposure to robots" measure, defined as the sum, across industries, of a commuting
zone's baseline employment share in that industry times the national growth in robots per worker in
that industry.

**Exposure-to-robots construction and identification.** The exogenous exposure-to-robots measure
(equation 13) is built using each commuting zone's 1970 industry employment shares (from the 1970
Census) combined with the 30th percentile, across nine European countries, of the change in robots
per thousand workers by industry between 1993 and 2007 (from IFR/EUKLEMS data). A parallel "US
exposure to robots" measure (equation 14) uses 1990 baseline industry employment shares combined
with the actual US robot penetration growth by industry between 2004 and 2007 (the earliest years
for which the IFR reports a US industry breakdown), rescaled to a 17-year equivalent. Because US
industry adoption could be correlated with industry- or commuting-zone-specific shocks that
independently affect labor demand, the paper instruments the endogenous US exposure measure with
the exogenous European-derived exposure measure in a two-stage least-squares design, arguing that
the European industry-level spread of robots proxies improvements in the "world technology
frontier" of robotics that are less likely to be driven by US-specific shocks. This design follows
the approach used by Autor, Dorn, and Hanson (2013) and Bloom, Draca, and Van Reenen (2015) for
Chinese-import shocks.

**Data and sample.** Robot counts come from the IFR's yearly supplier surveys, covering 50
countries from 1993-2014 (about 90 percent of the world industrial robot market); industry-level
breakdowns (19 industries: 6 roughly two-digit sectors outside manufacturing, 13 roughly
three-digit manufacturing sectors) are available from 1993 for nine countries (Denmark, Finland,
France, Germany, Italy, Norway, Spain, Sweden, and the United Kingdom, together 41 percent of the
world robot market) but only from 2004 for the United States; Japan is excluded following IFR
guidance because of a data reclassification. About 30 percent of robots are unclassified by
industry and are allocated proportionally to classified industries; Danish pre-1996 industry data
are imputed by deflating 1996 stocks; North American figures are reported only in aggregate (not
split from Canada/Mexico), a source of measurement error the IV design is intended to purge. Robot
counts are combined with 1990 industry employment from EUKLEMS to construct robots-per-thousand-
workers by country, industry, and year. The labor-market unit of analysis is the commuting zone,
using the 722 commuting zones defined by Tolbert and Sizer (1996), covering the continental United
States excluding Alaska and Hawaii. Employment, industry, occupation, and demographic outcomes are
built from 1970, 1990, and 2000 Census public-use microdata and the 2007 American Community Survey
(via Ruggles et al., 2010/IPUMS), supplemented with County Business Patterns (CBP) employment
counts for 1990, 2000, and 2007. Wage regressions use 800 demographic cells (age, education, race,
gender, birthplace, relationship to household head) crossed with commuting zone, yielding 163,114
non-empty cells out of 577,600 possible cells. Control variables include exposure to Chinese
imports (following Autor, Dorn, and Hanson, 2013) and to Mexican imports; offshoring of
intermediate inputs (Wright, 2014, updating Feenstra and Hanson, 1999); the share of routine-task
employment (Autor and Dorn, 2013); Bartik-style industry capital-stock growth; and establishment-
level computer adoption from the Harte-Hanks dataset (121,966 establishment observations in 1990,
473,091 in 2006). Regressions are estimated both as "long differences" (a single 1990-2007 change,
one observation per commuting zone) and "stacked differences" (two 10-year-equivalent changes,
1990-2000 and 2000-2007, allowing commuting-zone fixed effects); all main specifications are
weighted by 1990 working-age population, with standard errors robust to heteroscedasticity and
clustered at the state level.

### Key findings

**Robot-density data and growth.** Between 1993 and 2007 the stock of industrial robots in the
United States and Western Europe increased roughly fourfold. Over that period the increase
amounted to about one new industrial robot per thousand workers in the United States and about 1.6
new industrial robots per thousand workers in Western Europe. Robot density in the European sample
rose from about 0.6 robots per thousand workers in the early 1990s to about 2.6 per thousand in the
late 2000s; the US series, observed only in aggregate before 2004, rose from about 0.4 per thousand
workers in the early 1990s to about 1.4 per thousand in the late 2000s, tracking the 30th
percentile of the European distribution. The IFR estimated 1.5 to 1.75 million industrial robots in
operation worldwide at the time of writing, with the Boston Consulting Group (BCG, 2015) projecting
an increase to 4 to 6 million by 2025. The automotive industry accounted for 39 percent of
installed robots, followed by electronics (19 percent), metal products (9 percent), and plastics
and chemicals (9 percent); automotive manufacturing is identified as the single sector with by far
the largest robot penetration growth in both Europe and the United States. Across commuting zones,
the exogenous exposure-to-robots measure ranged from a predicted increase of about 0.12-0.3 robots
per thousand workers in low-exposure areas to 1-4.87 robots per thousand workers in high-exposure
areas (concentrated in, but not limited to, the industrial Midwest). The share of manufacturing
employment explains only about 18 percent of the cross-commuting-zone variation in exposure to
robots, and the (covariate-adjusted) correlation of the exposure measure with exposure to Chinese
imports (-0.052) and offshoring (-0.002) is small; correlations with Mexican-import exposure (0.26)
and the routine-job share (0.11) are somewhat higher but still modest.

**Employment effects (reduced form, OLS on exogenous exposure).** In the long-differences
specification (Table 2), the coefficient on exposure to robots for the change in the Census private
employment-to-population ratio, 1990-2007, is -0.92 (SE = 0.30) with only Census-division controls;
falls to -0.78 adding demographics; -0.77 (SE = 0.18) adding broad industry-share controls; and
-0.75 (SE = 0.17) in the preferred specification that also controls for Chinese and Mexican import
exposure, routine-job share, and offshoring. The corresponding CBP employment-to-population-ratio
coefficients across the same four specifications are -1.43 (SE = 0.50), -1.17, -1.23 (SE = 0.37),
and -1.31 (SE = 0.35). An unweighted version of the preferred specification gives -1.12 (SE = 0.26)
for the Census measure and -1.12 (SE = 0.41) for CBP; a robust regression that downweights outliers
(Li, 1985) and a specification excluding the top 1 percent most-exposed commuting zones (Detroit,
MI; Lansing City, MI; Saginaw City, MI; Defiance, OH; Lorain, OH; Muncie, IN; Racine, WI; and
Wilmington, DE) give similar or somewhat larger coefficients. In stacked-differences specifications
with commuting-zone fixed effects (Table 3), the coefficient is -0.61 (SE = 0.11) for the Census
measure and -1.92 (SE = 0.34) for the CBP measure.

**Wage effects (reduced form).** Estimated on log hourly wages within 800 demographic cells, the
preferred long-differences coefficient (Table 2, column 4) is -1.48 (SE = 0.32), with similar
estimates across the other long-differences specifications and somewhat larger, more negative
coefficients when outliers are downweighted or excluded. In stacked differences, the baseline
coefficient is -1.92 (SE = 0.37), rising in magnitude to -2.52 (SE = 0.49) once commuting-zone fixed
effects are included.

**Two-stage least squares (instrumented) estimates.** The first-stage relationship linking US
exposure to robots to the exogenous European-derived exposure measure has a coefficient of 2.03,
implying that the IV/2SLS estimates are roughly half the corresponding reduced-form coefficients.
The main IV estimate for the Census private employment-to-population ratio (long differences,
preferred specification) is -0.37 (SE = 0.11); the corresponding IV wage estimate (log hourly
wage) is -0.73 (SE = 0.22). These are the headline "one more robot per thousand workers" figures:
in a commuting zone with the US-average level of exposure, this dose of exposure is associated with
a 0.37 percentage point lower employment-to-population ratio and 0.73 percent lower wage growth,
relative to a commuting zone with no exposure to robots. Restated in levels, these coefficients
imply that one additional robot reduces employment in the affected commuting zone by about 6.2
workers, and one additional robot per thousand workers reduces average yearly wages there by about
$200.

**Aggregate magnitudes (model-based extrapolation).** Local estimates are converted to aggregate,
economy-wide magnitudes using the trade version of the model together with externally sourced
parameter values: epsilon = 0.43 (inverse of the macro extensive-margin labor-supply elasticity,
from Chetty et al., 2011), sigma = 1 (elasticity of substitution across industries, following
Oberfield and Raval, 2014), lambda = 7 (elasticity of substitution between traded varieties, from
the trade literature), a labor share s_cL = 0.66, and pi = 0.3 (the average profitability/cost-
saving gain from substituting robots for labor, following BCG, 2015). These choices imply a
back-out physical productivity of labor relative to robots of gamma = 153 (equivalently, one robot
performs work equivalent to 1000/153 = 6.5 workers) and an inverse robot-supply elasticity of eta =
1.5 (implying a robot-supply elasticity of about 0.66). Under this parameterization, the paper's
preferred aggregate estimate is that one more robot per thousand workers reduces the aggregate
employment-to-population ratio by about 0.34 percentage points (equivalent to 5.6 workers per
robot, about 10 percent smaller than the local estimate) and aggregate wages by about 0.5 percent
(about 30 percent smaller than the local estimate). The same parameterization implies a modest 0.13
percent increase in GDP for each additional robot per thousand workers. These aggregate magnitudes
are reported as insensitive to reasonable variation in lambda (5 to 10), sigma (0.5 to 2), and
epsilon (0.35 to 0.5), but sensitive to pi: reducing pi to 0.1 makes aggregate and local effects
converge, while raising pi to 0.5 shrinks the aggregate effect to 4.65 fewer workers and 0.2 percent
lower wages per robot.

A more conservative aggregate estimate, restricting attention to the employment decline within
heavily robotized manufacturing alone (0.2 percentage points of the population, versus the 0.37
percentage point total decline) and attributing the remainder to local demand spillovers that would
not be expected to persist in the aggregate, implies a lower-bound aggregate effect of one more
robot per thousand workers reducing the employment-to-population ratio by about 0.18 percentage
points (3 workers per robot) and wages by about 0.25 percent. This conservative computation implies
a lower value of gamma = 300 (one robot equivalent to 3.3 workers) and a decomposition in which
about 50 percent of the estimated wage decline is attributed to the direct effect of robots and
about 50 percent to local demand spillovers. The paper's overall summary range across all these
computations is aggregate employment effects of 3 to 5.6 workers displaced per additional robot,
and aggregate wage declines of 0.25 to 0.5 percent per additional robot per thousand workers, with
historical job losses attributable to robots through the sample period estimated at 360,000 to
670,000 jobs (0.18-0.34 percentage points of the employment-to-population ratio). Extrapolating
forward using BCG's (2015) scenarios for robot growth to 2025, an "aggressive" scenario (world
robot stock quadrupling, equivalent to 5.25 more robots per thousand US workers) is projected to
produce a 0.94-1.76 percentage point decline in the employment-to-population ratio and a 1.3-2.6
percent decline in wage growth between 2015 and 2025; a more conservative scenario (less than a
threefold increase in the robot stock) is projected to produce a 0.54-1 percentage point employment
decline and a 0.75-1.5 percent wage decline.

**Heterogeneity.** Employment effects are concentrated in manufacturing, and specifically in the
most heavily robotized industries (automobile manufacturing, electronics, metal products,
chemicals, pharmaceuticals, plastics, food, glass and ceramics), with smaller negative effects in
construction, business services, wholesale, and services/retail, and no consistent positive effect
in any sector (weak, inconsistent positive point estimates appear only for finance, the public
sector, and non-robotized manufacturing). By occupation, negative effects appear in nearly all
categories except managers (estimated near zero in the baseline specification), with the largest
declines in routine manual, blue-collar, operator/assembly, and machinist/transport occupations. By
education, negative employment and wage effects are found for workers with less than high school,
high school, and some college; a small, marginally significant negative employment effect is found
for college graduates; and no effect is found for workers with post-college degrees. By gender, the
baseline long-differences employment coefficient is -1.01 for men versus -0.52 for women (about 1.5
to 2 times larger for men), while wage effects are of comparable magnitude for both groups. Robots
are estimated to have raised the 90-10 wage-percentile differential by as much as 1 percentage
point of the total 12 percentage point increase in that differential between 1990 and 2007. No
significant effect is found on non-labor income (Bureau of Economic Analysis and IRS data), which
the paper interprets as consistent with the estimated effects operating specifically through labor
income rather than a general area-wide decline.

**Placebo and robustness checks.** Applying the same specifications to pre-period (1970-1990)
outcomes yields a precisely estimated near-zero coefficient for employment in the preferred
specification, with no consistent evidence of pre-existing negative or positive wage trends once
industry controls are included. Separating out the automobile industry's exposure to robots from
all other industries' exposure yields similar-sized, similarly significant coefficients for both
components in most specifications, indicating the results are not driven by automobile
manufacturing alone. Results are reported as robust to a Bartik-style control for industries in
national employment decline, to controls for industry-level capital-stock growth and computer/IT
adoption (which are themselves generally insignificant or positively signed), to lagged-dependent-
variable specifications addressing mean reversion, to a lasso-selected covariate set (Chernozhukov,
Belloni, and Hansen, 2014), to the inclusion of state fixed effects, and to alternative choices of
baseline year (1970, 1980, or 1990 employment shares) and alternative percentiles/moments of the
European robot-adoption distribution used to build the exposure measure. Extending the outcome
window to 1990-2010 and 1990-2014 (Appendix Table A3) yields negative and mostly significant but
generally smaller-magnitude coefficients than the 1990-2007 baseline (for example, -0.876 to -0.321
across the two longer windows for the Census private employment-to-population measure, compared
with -0.75 in the 1990-2007 baseline).

### Limitations

The paper's own stated caveats include the following. First, if other labor-saving technologies are
being adopted in the same industries concurrently with robots, the estimated coefficients should be
interpreted as the joint effect of this bundle of technologies rather than the isolated effect of
industrial robots alone; the authors note this is only partly addressed by the finding that results
are largely unchanged when controlling for measured capital and IT trends. Second, the IFR data
have several acknowledged limitations: about 30 percent of robots are unclassified by industry and
must be allocated proportionally; the data exclude "dedicated" (single-application) industrial
robots entirely; Danish pre-1996 industry splits are imputed; and US/Canadian/Mexican robot counts
are aggregated together at the North American level rather than reported for the United States
alone, introducing measurement error that the instrumental-variables design is intended, but not
guaranteed, to purge. Third, the paper's local commuting-zone estimates capture only within-labor-
market equilibrium responses; the authors explicitly describe the study as "only a first step,"
noting that trade with other local labor markets, migration, and technology's own endogenous
response to changed factor prices (e.g., the creation of new labor-intensive tasks) are only
partly modeled or not directly estimated, and that aggregate national effects can only be recovered
via additional structural assumptions and externally calibrated parameters (epsilon, sigma, lambda,
pi), not estimated directly from the data. Fourth, the instrumental-variables strategy is described
by the authors as "not a panacea" against omitted-variable bias: it would be compromised if changes
in robot usage in other advanced economies are themselves correlated with shocks to the same US
industries (e.g., common import-competition or wage-growth shocks prompting robot adoption on both
sides of the Atlantic, or US industry decline directly encouraging foreign competitors to adopt
robots). Fifth, the sample period ends in 2007 specifically to avoid conflating robot effects with
the Great Recession, so the estimates do not speak to the 2008-2009 downturn or its aftermath;
appendix extensions to 2010 and 2014 show generally smaller-magnitude coefficients. Sixth,
forward-looking projections to 2025 rely on external, third-party (BCG, 2015) scenarios for future
robot adoption rather than on data internal to the paper, and the authors caution that general
equilibrium adjustments to technology may emerge only slowly and that employment/wage responses
could differ once robot penetration passes some unobserved threshold.

A further limitation specific to this summary: the source document is the NBER working paper
(No. 23285, dated March 2017), described on its own cover page as "circulated for discussion and
comment" and explicitly not peer-reviewed at that stage. This summary reports the working paper's
own stated coefficients, standard errors, and headline magnitudes exactly as printed in that
document. It is not a summary of the peer-reviewed article subsequently published as Acemoglu and
Restrepo (2020) in the *Journal of Political Economy* (128(6), 2188-2244, DOI 10.1086/705716); the
working paper and the published version are separate documents that need not report identical
figures, table structures, or sample windows, and no comparison or verification against the
published version was attempted here. Any use of this summary's numbers as a stand-in for the
published JPE article's numbers should be treated as unconfirmed.

### Topic mapping

FA6. Source list entry 4. Sub-Q 6. Empirical estimation, using a task-based theoretical model and
an instrumental-variables identification strategy, of the relationship between industrial robot
capital deployment (measured as robots per thousand workers, by industry and commuting zone) and
US local labor-market outcomes -- employment-to-population ratios and wages -- between 1990 and
2007, together with a model-based translation of these local estimates into aggregate,
economy-wide employment, wage, and GDP magnitudes.

---

## Provenance

- **Landed:** Step 2.5, 2026-08-28, by `tools/merge_identity.js --stage`.
- **Source:** `_intake/japanese-miracle/lit/acemoglu-2020-robots-and-jobs.md`
- **Upstream ref:** `none` — the `Source:` path is under `_intake/`, which is not a git working copy, so no ref exists. Stated rather than omitted: an omitted field is invisible and a stated `none` is falsifiable.
- **Merge-time digest:** `sha256:435da2a3aac03123fdf03f53420e07fb5dba63c17d4d5cb1191e884dafef5371` over the bytes of the `Source:` file, taken 2026-08-28. This is the value `bootstrap_contract.md` §7.2 compares upstream against to reach `equal` or `diverged`; without it that verdict is `unknown`.
- **Byte source:** sole-intake
- **Body edit (2.6):** DECLARED house-format normalization, 2026-08-28, sub-step 2.6 (MERGE-6). Added: a `## Metadata` heading and the one line under it (2 non-blank lines), derived from this file's own `## Citation` block. **This amends the byte-identity claim carried by `Byte source` above:** the landed body is no longer byte-identical to the `byte_source` copy. It equals that copy under exactly the operations named here and no others — `insert-metadata`.
- **Disposition:** LIFT (a landing mode, not a gate)
- **Dedup key:** L1|10.1086/705716
- **Field:** economics · **Folder:** organization-and-production-systems · **Also:** growth-theory
- **Plan row rev:** 1
- **Provenance depth:** `primary` · sub-step 2.8 (ECON-2), from `cr_scratch/step2_manager_depth.tsv`. Basis, verbatim: Citation: NBER WP 23285, the authors' own study; the note on version summarized says the summary was produced from the working-paper PDF only.

## Contested
- ECR-16 B
