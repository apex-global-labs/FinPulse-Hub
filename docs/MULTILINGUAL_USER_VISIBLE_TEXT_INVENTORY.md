# FinPulse Hub — Multilingual User-Visible Text Inventory

- **Audit date:** 2026-11-21
- **Audited baseline:** `main` at `a4983bf8b84e8a2777bbed137ecedb70d74d6011`
- **Canonical inventory source:** `tool-category-mapping.json` (220 entries; 220 unique IDs; validation declares 220 expected / 220 actual / 0 unassigned)
- **Scope:** source-location and text-class inventory for the 220-tool application; documentation only.
- **Safety boundary:** no formulas, calculation code, input parsing, tool IDs, parameter keys, share parameters, canonical URLs, or production files are changed by this inventory.

## 1. Verified 220-tool source distribution

| Source file | Tool records | Text-bearing responsibilities to inspect |
|---|---:|---|
| `advanced-math-tools.js` | 20 | Advanced math tool metadata, field labels, result labels/metrics/notes, SEO intro and FAQs |
| `app.js` | 45 | 45 primary tool definitions; shared form/result/SEO/history/error renderer |
| `date-time-tools.js` | 25 | Date/time metadata, date/time/time-zone field labels, result text and FAQs |
| `developer-tools.js` | 20 | Text/developer tool metadata, input/output labels, action/status text and FAQs |
| `education-lifestyle-tools.js` | 20 | Education/lifestyle metadata, fields, validation, results, assumptions and FAQs |
| `health-activity-tools.js` | 15 | Activity tool metadata, fields, result summaries, disclaimers and FAQs |
| `health-wellness-tools.js` | 15 | Wellness tool metadata, fields, result summaries, disclaimers and FAQs |
| `lifestyle-tools.js` | 15 | Lifestyle/home tools metadata, fields, results, assumptions and FAQs |
| `math-tools.js` | 25 | Math tool metadata, field labels, result labels/metrics/notes, SEO intro and FAQs |
| `unit-converter-tools.js` | 20 | Unit converter metadata, source/destination labels, conversion results and shared FAQs |

**Important:** The canonical `sourceFile` field assigns all 220 tools to these ten files. This is a source ownership inventory, not proof that every literal/dynamic string has been individually extracted or translated.

## 2. Complete canonical tool list

The table below is generated from the canonical directory mapping on the audited `main` commit. Stable IDs are identifiers, not translation keys to rename.

| # | Category | Subcategory | Tool name (English source) | Stable tool ID | Definition source |
|---:|---|---|---|---|---|
| 1 | Finance & Money | Currency & Money Transfer | Currency Converter | `currency` | `app.js` |
| 2 | Finance & Money | Currency & Money Transfer | Exchange Fee & Markup Calculator | `exchange-fees` | `app.js` |
| 3 | Finance & Money | Currency & Money Transfer | International Money Transfer Cost Calculator | `transfer-compare` | `app.js` |
| 4 | Finance & Money | Mortgage Calculators | Mortgage Calculator | `mortgage` | `app.js` |
| 5 | Finance & Money | Mortgage Calculators | Mortgage Affordability Calculator | `affordability` | `app.js` |
| 6 | Finance & Money | Mortgage Calculators | Mortgage Payoff & Extra Payment Calculator | `payoff` | `app.js` |
| 7 | Finance & Money | Mortgage Calculators | Mortgage Refinance Comparison | `refinance` | `app.js` |
| 8 | Finance & Money | Loan Calculators | Loan Calculator | `loan` | `app.js` |
| 9 | Finance & Money | Loan Calculators | EMI Calculator | `emi` | `app.js` |
| 10 | Finance & Money | Loan Calculators | Auto / Car Loan Calculator | `car` | `app.js` |
| 11 | Finance & Money | Loan Calculators | Loan Amortization Calculator | `amortization` | `app.js` |
| 12 | Finance & Money | Loan Calculators | Personal Loan Calculator | `personal-loan` | `app.js` |
| 13 | Finance & Money | Loan Calculators | Student Loan Repayment Calculator | `student-loan` | `app.js` |
| 14 | Finance & Money | Investment & Return Calculators | Compound Interest Calculator | `compound` | `app.js` |
| 15 | Finance & Money | Investment & Return Calculators | Simple Interest Calculator | `simple-interest` | `app.js` |
| 16 | Finance & Money | Investment & Return Calculators | Retirement Savings Calculator | `retirement` | `app.js` |
| 17 | Finance & Money | Investment & Return Calculators | 401k Contribution Calculator | `401k` | `app.js` |
| 18 | Finance & Money | Investment & Return Calculators | Roth vs Traditional IRA Comparison | `ira` | `app.js` |
| 19 | Finance & Money | Investment & Return Calculators | Business ROI Calculator | `business-roi` | `app.js` |
| 20 | Finance & Money | Investment & Return Calculators | Rental Yield Calculator | `rental-yield` | `app.js` |
| 21 | Finance & Money | Percentage & Everyday Calculators | Percentage Calculator | `percentage` | `app.js` |
| 22 | Finance & Money | Shopping & Everyday Calculators | Tip Calculator | `tip` | `app.js` |
| 23 | Finance & Money | Shopping & Everyday Calculators | Discount Calculator | `discount` | `app.js` |
| 24 | Finance & Money | Savings & Personal Finance | Savings Goal Calculator | `savings` | `app.js` |
| 25 | Finance & Money | Savings & Personal Finance | Inflation Calculator | `inflation` | `app.js` |
| 26 | Finance & Money | Savings & Personal Finance | CD Calculator | `cd` | `app.js` |
| 27 | Finance & Money | Savings & Personal Finance | APY Calculator | `apy` | `app.js` |
| 28 | Finance & Money | Savings & Personal Finance | Emergency Fund Calculator | `emergency-fund` | `app.js` |
| 29 | Finance & Money | Savings & Personal Finance | Net Worth Calculator | `net-worth` | `app.js` |
| 30 | Finance & Money | Business & Freelance Calculators | Freelance Hourly Rate Calculator | `freelance` | `app.js` |
| 31 | Finance & Money | Business & Freelance Calculators | Profit Margin Calculator | `margin` | `app.js` |
| 32 | Finance & Money | Business & Freelance Calculators | Freelance Project Pricing Calculator | `freelance-project` | `app.js` |
| 33 | Finance & Money | Business & Freelance Calculators | Freelancer Net Income After Costs Calculator | `freelancer-net-income` | `app.js` |
| 34 | Finance & Money | Business & Freelance Calculators | Markup Calculator | `markup` | `app.js` |
| 35 | Finance & Money | Business & Freelance Calculators | Break-even Calculator | `break-even` | `app.js` |
| 36 | Finance & Money | Business & Freelance Calculators | Cash Flow Projection Calculator | `cash-flow` | `app.js` |
| 37 | Finance & Money | Tax Calculators | Tax Calculator | `tax` | `app.js` |
| 38 | Finance & Money | Tax Calculators | Income Tax Calculator | `income-tax` | `app.js` |
| 39 | Finance & Money | Tax Calculators | Sales Tax Calculator | `sales-tax` | `app.js` |
| 40 | Finance & Money | Tax Calculators | VAT / GST Calculator | `vat-gst` | `app.js` |
| 41 | Finance & Money | Tax Calculators | Tax Refund Estimator | `tax-refund` | `app.js` |
| 42 | Finance & Money | Salary & Payroll Calculators | Salary Take-Home Calculator | `salary` | `app.js` |
| 43 | Finance & Money | Salary & Payroll Calculators | Paycheck Calculator | `paycheck` | `app.js` |
| 44 | Finance & Money | Salary & Payroll Calculators | Payroll Calculator | `payroll` | `app.js` |
| 45 | Finance & Money | Salary & Payroll Calculators | Overtime Pay Calculator | `overtime` | `app.js` |
| 46 | Math & Statistics | Basic Math & Number Tools | Basic Arithmetic Calculator | `basic-arithmetic` | `math-tools.js` |
| 47 | Math & Statistics | Basic Math & Number Tools | Fraction Calculator | `fraction` | `math-tools.js` |
| 48 | Math & Statistics | Basic Math & Number Tools | Mixed Number Calculator | `mixed-number` | `math-tools.js` |
| 49 | Math & Statistics | Basic Math & Number Tools | Decimal to Fraction Converter | `decimal-fraction` | `math-tools.js` |
| 50 | Math & Statistics | Basic Math & Number Tools | Ratio Calculator | `ratio` | `math-tools.js` |
| 51 | Math & Statistics | Basic Math & Number Tools | Proportion Calculator | `proportion` | `math-tools.js` |
| 52 | Math & Statistics | Basic Math & Number Tools | Average Calculator | `average` | `math-tools.js` |
| 53 | Math & Statistics | Basic Math & Number Tools | Percentage Change Calculator | `percentage-change` | `math-tools.js` |
| 54 | Math & Statistics | Basic Math & Number Tools | Percent Error Calculator | `percent-error` | `math-tools.js` |
| 55 | Math & Statistics | Basic Math & Number Tools | Rounding Calculator | `rounding` | `math-tools.js` |
| 56 | Math & Statistics | Basic Math & Number Tools | Significant Figures Calculator | `significant-figures` | `math-tools.js` |
| 57 | Math & Statistics | Basic Math & Number Tools | Scientific Notation Converter | `scientific-notation` | `math-tools.js` |
| 58 | Math & Statistics | Advanced Math & Number Theory | Exponent Calculator | `exponent` | `math-tools.js` |
| 59 | Math & Statistics | Advanced Math & Number Theory | Square Root Calculator | `square-root` | `math-tools.js` |
| 60 | Math & Statistics | Advanced Math & Number Theory | Cube Root Calculator | `cube-root` | `math-tools.js` |
| 61 | Math & Statistics | Advanced Math & Number Theory | Nth Root Calculator | `nth-root` | `math-tools.js` |
| 62 | Math & Statistics | Advanced Math & Number Theory | Factorial Calculator | `factorial` | `math-tools.js` |
| 63 | Math & Statistics | Advanced Math & Number Theory | GCD Calculator | `gcd` | `math-tools.js` |
| 64 | Math & Statistics | Advanced Math & Number Theory | LCM Calculator | `lcm` | `math-tools.js` |
| 65 | Math & Statistics | Advanced Math & Number Theory | Prime Number Checker | `prime-checker` | `math-tools.js` |
| 66 | Math & Statistics | Advanced Math & Number Theory | Prime Factorization Calculator | `prime-factorization` | `math-tools.js` |
| 67 | Math & Statistics | Advanced Math & Number Theory | Modulo / Remainder Calculator | `modulo` | `math-tools.js` |
| 68 | Math & Statistics | Advanced Math & Number Theory | Logarithm Calculator | `logarithm` | `advanced-math-tools.js` |
| 69 | Math & Statistics | Advanced Math & Number Theory | Complex Number Calculator | `complex-number` | `advanced-math-tools.js` |
| 70 | Math & Statistics | Advanced Math & Number Theory | Arithmetic & Geometric Sequence Calculator | `sequence-calculator` | `advanced-math-tools.js` |
| 71 | Math & Statistics | Advanced Math & Number Theory | Series Sum Calculator | `series-sum` | `advanced-math-tools.js` |
| 72 | Math & Statistics | Advanced Math & Number Theory | Permutation Calculator | `permutation` | `advanced-math-tools.js` |
| 73 | Math & Statistics | Advanced Math & Number Theory | Combination Calculator | `combination` | `advanced-math-tools.js` |
| 74 | Math & Statistics | Geometry | Pythagorean Theorem Calculator | `pythagorean` | `math-tools.js` |
| 75 | Math & Statistics | Geometry | Circle Calculator | `circle` | `math-tools.js` |
| 76 | Math & Statistics | Geometry | Triangle Area Calculator | `triangle-area` | `math-tools.js` |
| 77 | Math & Statistics | Algebra & Linear Algebra | Linear Equation Solver | `linear-equation` | `advanced-math-tools.js` |
| 78 | Math & Statistics | Algebra & Linear Algebra | Quadratic Equation Solver | `quadratic-equation` | `advanced-math-tools.js` |
| 79 | Math & Statistics | Algebra & Linear Algebra | Simultaneous Equations Solver | `simultaneous-equations` | `advanced-math-tools.js` |
| 80 | Math & Statistics | Algebra & Linear Algebra | Polynomial Calculator | `polynomial-calculator` | `advanced-math-tools.js` |
| 81 | Math & Statistics | Algebra & Linear Algebra | Matrix Operations Calculator | `matrix-operations` | `advanced-math-tools.js` |
| 82 | Math & Statistics | Algebra & Linear Algebra | Matrix Determinant Calculator | `matrix-determinant` | `advanced-math-tools.js` |
| 83 | Math & Statistics | Algebra & Linear Algebra | Matrix Inverse Calculator | `matrix-inverse` | `advanced-math-tools.js` |
| 84 | Math & Statistics | Statistics & Probability | Probability Calculator | `probability` | `advanced-math-tools.js` |
| 85 | Math & Statistics | Statistics & Probability | Mean Median Mode Calculator | `mean-median-mode` | `advanced-math-tools.js` |
| 86 | Math & Statistics | Statistics & Probability | Variance & Standard Deviation Calculator | `variance-standard-deviation` | `advanced-math-tools.js` |
| 87 | Math & Statistics | Statistics & Probability | Z-Score Calculator | `z-score` | `advanced-math-tools.js` |
| 88 | Math & Statistics | Statistics & Probability | Correlation Calculator | `correlation` | `advanced-math-tools.js` |
| 89 | Math & Statistics | Statistics & Probability | Linear Regression Calculator | `linear-regression` | `advanced-math-tools.js` |
| 90 | Math & Statistics | Statistics & Probability | Confidence Interval Calculator | `confidence-interval` | `advanced-math-tools.js` |
| 91 | Date & Time | Date Calculators | Age Calculator | `age-calculator` | `date-time-tools.js` |
| 92 | Date & Time | Date Calculators | Date Difference Calculator | `date-difference` | `date-time-tools.js` |
| 93 | Date & Time | Date Calculators | Add Days Calculator | `add-days` | `date-time-tools.js` |
| 94 | Date & Time | Date Calculators | Subtract Days Calculator | `subtract-days` | `date-time-tools.js` |
| 95 | Date & Time | Date Calculators | Business Days Calculator | `business-days` | `date-time-tools.js` |
| 96 | Date & Time | Date Calculators | Working Days Calculator | `working-days` | `date-time-tools.js` |
| 97 | Date & Time | Date Calculators | ISO Week Number Calculator | `iso-week` | `date-time-tools.js` |
| 98 | Date & Time | Date Calculators | Day of Year Calculator | `day-of-year` | `date-time-tools.js` |
| 99 | Date & Time | Date Calculators | Days in Month Calculator | `days-in-month` | `date-time-tools.js` |
| 100 | Date & Time | Date Calculators | Leap Year Checker | `leap-year` | `date-time-tools.js` |
| 101 | Date & Time | Date Calculators | Calendar Month View | `calendar-month` | `date-time-tools.js` |
| 102 | Date & Time | Date Calculators | Recurring Date Calculator | `recurring-date` | `date-time-tools.js` |
| 103 | Date & Time | Date Calculators | Term Duration Calculator | `term-duration` | `date-time-tools.js` |
| 104 | Date & Time | Time Calculators | Time Duration Calculator | `time-duration` | `date-time-tools.js` |
| 105 | Date & Time | Time Calculators | Time Difference Calculator | `time-difference` | `date-time-tools.js` |
| 106 | Date & Time | Time Calculators | Add Time Calculator | `add-time` | `date-time-tools.js` |
| 107 | Date & Time | Time Calculators | Subtract Time Calculator | `subtract-time` | `date-time-tools.js` |
| 108 | Date & Time | Time Calculators | Countdown Timer | `countdown-timer` | `date-time-tools.js` |
| 109 | Date & Time | Time Calculators | Event Date Countdown | `event-countdown` | `date-time-tools.js` |
| 110 | Date & Time | Timestamp Tools | Date to Unix Timestamp | `date-to-unix` | `date-time-tools.js` |
| 111 | Date & Time | Timestamp Tools | Unix Timestamp to Date | `unix-to-date` | `date-time-tools.js` |
| 112 | Date & Time | World Clock & Time Zones | World Clock | `world-clock` | `date-time-tools.js` |
| 113 | Date & Time | World Clock & Time Zones | Time Zone Converter | `timezone-converter` | `date-time-tools.js` |
| 114 | Date & Time | World Clock & Time Zones | UTC Offset Calculator | `utc-offset` | `date-time-tools.js` |
| 115 | Date & Time | World Clock & Time Zones | Meeting Time Planner | `meeting-time-planner` | `date-time-tools.js` |
| 116 | Unit & Data Conversion | Length, Area & Paper Sizes | Length Converter | `length-converter` | `unit-converter-tools.js` |
| 117 | Unit & Data Conversion | Length, Area & Paper Sizes | Area Unit Converter | `area-converter` | `unit-converter-tools.js` |
| 118 | Unit & Data Conversion | Length, Area & Paper Sizes | Paper Size Converter | `paper-size-converter` | `unit-converter-tools.js` |
| 119 | Unit & Data Conversion | Weight & Mass | Weight / Mass Converter | `mass-converter` | `unit-converter-tools.js` |
| 120 | Unit & Data Conversion | Temperature | Temperature Converter | `temperature-converter` | `unit-converter-tools.js` |
| 121 | Unit & Data Conversion | Volume & Cooking Measures | Volume Unit Converter | `volume-converter` | `unit-converter-tools.js` |
| 122 | Unit & Data Conversion | Volume & Cooking Measures | Cooking Measurement Converter | `cooking-measurement-converter` | `unit-converter-tools.js` |
| 123 | Unit & Data Conversion | Speed & Fuel Economy | Speed Converter | `speed-converter` | `unit-converter-tools.js` |
| 124 | Unit & Data Conversion | Speed & Fuel Economy | Fuel Economy Converter | `fuel-economy-converter` | `unit-converter-tools.js` |
| 125 | Unit & Data Conversion | Science & Engineering Units | Pressure Converter | `pressure-converter` | `unit-converter-tools.js` |
| 126 | Unit & Data Conversion | Science & Engineering Units | Energy Converter | `energy-converter` | `unit-converter-tools.js` |
| 127 | Unit & Data Conversion | Science & Engineering Units | Power Converter | `power-converter` | `unit-converter-tools.js` |
| 128 | Unit & Data Conversion | Science & Engineering Units | Frequency Converter | `frequency-converter` | `unit-converter-tools.js` |
| 129 | Unit & Data Conversion | Science & Engineering Units | Angle Converter | `angle-converter` | `unit-converter-tools.js` |
| 130 | Unit & Data Conversion | Science & Engineering Units | Density Converter | `density-converter` | `unit-converter-tools.js` |
| 131 | Unit & Data Conversion | Digital Storage & Data Transfer | Data Storage Converter | `data-storage-converter` | `unit-converter-tools.js` |
| 132 | Unit & Data Conversion | Digital Storage & Data Transfer | Data Transfer Speed Converter | `data-transfer-speed-converter` | `unit-converter-tools.js` |
| 133 | Unit & Data Conversion | Digital Storage & Data Transfer | Download Time Estimator | `download-time-estimator` | `unit-converter-tools.js` |
| 134 | Unit & Data Conversion | Number Systems & Numerals | Number Base Converter | `number-base-converter` | `unit-converter-tools.js` |
| 135 | Unit & Data Conversion | Number Systems & Numerals | Roman Numeral Converter | `roman-numeral-converter` | `unit-converter-tools.js` |
| 136 | Developer & Text Tools | Text & Writing Utilities | Word Counter | `word-counter` | `developer-tools.js` |
| 137 | Developer & Text Tools | Text & Writing Utilities | Character Counter | `character-counter` | `developer-tools.js` |
| 138 | Developer & Text Tools | Text & Writing Utilities | Sentence Counter | `sentence-counter` | `developer-tools.js` |
| 139 | Developer & Text Tools | Text & Writing Utilities | Paragraph Counter | `paragraph-counter` | `developer-tools.js` |
| 140 | Developer & Text Tools | Text & Writing Utilities | Reading Time Calculator | `reading-time-calculator` | `developer-tools.js` |
| 141 | Developer & Text Tools | Text & Writing Utilities | Case Converter | `case-converter` | `developer-tools.js` |
| 142 | Developer & Text Tools | Text & Writing Utilities | Text Reverser | `text-reverser` | `developer-tools.js` |
| 143 | Developer & Text Tools | Text & Writing Utilities | Duplicate Line Remover | `duplicate-line-remover` | `developer-tools.js` |
| 144 | Developer & Text Tools | Text & Writing Utilities | Text Compare / Diff Tool | `text-compare-diff` | `developer-tools.js` |
| 145 | Developer & Text Tools | Text & Writing Utilities | Whitespace Cleaner | `whitespace-cleaner` | `developer-tools.js` |
| 146 | Developer & Text Tools | Text & Writing Utilities | Line Sorter | `line-sorter` | `developer-tools.js` |
| 147 | Developer & Text Tools | Text & Writing Utilities | Text-to-Slug Generator | `text-to-slug-generator` | `developer-tools.js` |
| 148 | Developer & Text Tools | Encoding & Decoding | HTML Entity Encoder / Decoder | `html-entity-encoder-decoder` | `developer-tools.js` |
| 149 | Developer & Text Tools | Encoding & Decoding | URL Encoder / Decoder | `url-encoder-decoder` | `developer-tools.js` |
| 150 | Developer & Text Tools | Encoding & Decoding | Base64 Encoder / Decoder | `base64-encoder-decoder` | `developer-tools.js` |
| 151 | Developer & Text Tools | Code & Markup Utilities | JSON Formatter & Validator | `json-formatter-validator` | `developer-tools.js` |
| 152 | Developer & Text Tools | Code & Markup Utilities | HTML Formatter | `html-formatter` | `developer-tools.js` |
| 153 | Developer & Text Tools | Code & Markup Utilities | CSS Formatter | `css-formatter` | `developer-tools.js` |
| 154 | Developer & Text Tools | Code & Markup Utilities | JavaScript Formatter | `javascript-formatter` | `developer-tools.js` |
| 155 | Developer & Text Tools | Code & Markup Utilities | HTML/CSS/JS Minifier | `html-css-js-minifier` | `developer-tools.js` |
| 156 | Developer & Text Tools | Code & Markup Utilities | Markdown Previewer | `markdown-previewer` | `education-lifestyle-tools.js` |
| 157 | Developer & Text Tools | Developer Utilities | UUID Generator | `uuid-generator` | `education-lifestyle-tools.js` |
| 158 | Developer & Text Tools | Developer Utilities | Regex Tester (safe local matching) | `regex-tester` | `education-lifestyle-tools.js` |
| 159 | Developer & Text Tools | Developer Utilities | Color Code Converter (HEX/RGB/HSL) | `color-code-converter` | `education-lifestyle-tools.js` |
| 160 | Developer & Text Tools | Developer Utilities | Unix Timestamp Unit Helper | `unix-timestamp-unit-helper` | `education-lifestyle-tools.js` |
| 161 | Education & Study | Grades, GPA & Exams | GPA Calculator | `gpa-calculator` | `education-lifestyle-tools.js` |
| 162 | Education & Study | Grades, GPA & Exams | CGPA Calculator | `cgpa-calculator` | `education-lifestyle-tools.js` |
| 163 | Education & Study | Grades, GPA & Exams | Grade Calculator | `grade-calculator` | `education-lifestyle-tools.js` |
| 164 | Education & Study | Grades, GPA & Exams | Exam Percentage Calculator | `exam-percentage-calculator` | `education-lifestyle-tools.js` |
| 165 | Education & Study | Grades, GPA & Exams | Marks Required Calculator | `marks-required-calculator` | `education-lifestyle-tools.js` |
| 166 | Education & Study | Grades, GPA & Exams | Weighted Grade Calculator | `weighted-grade-calculator` | `education-lifestyle-tools.js` |
| 167 | Education & Study | Grades, GPA & Exams | Final Exam Grade Calculator | `final-exam-grade-calculator` | `education-lifestyle-tools.js` |
| 168 | Education & Study | Grades, GPA & Exams | Semester GPA Planner | `semester-gpa-planner` | `education-lifestyle-tools.js` |
| 169 | Education & Study | Grades, GPA & Exams | Attendance Percentage Calculator | `attendance-percentage-calculator` | `education-lifestyle-tools.js` |
| 170 | Education & Study | Grades, GPA & Exams | Study Time Planner | `study-time-planner` | `education-lifestyle-tools.js` |
| 171 | Education & Study | Grades, GPA & Exams | Reading Schedule Planner | `reading-schedule-planner` | `education-lifestyle-tools.js` |
| 172 | Education & Study | Grades, GPA & Exams | Assignment Grade Tracker | `assignment-grade-tracker` | `education-lifestyle-tools.js` |
| 173 | Education & Study | Grades, GPA & Exams | Study Topic Organizer | `study-topic-organizer` | `lifestyle-tools.js` |
| 174 | Home & Construction | Building Materials & Volume | Concrete Volume Calculator | `concrete-volume-calculator` | `education-lifestyle-tools.js` |
| 175 | Home & Construction | Building Materials & Volume | Brick Quantity Estimator | `brick-quantity-estimator` | `education-lifestyle-tools.js` |
| 176 | Home & Construction | Building Materials & Volume | Cement / Sand / Aggregate Estimator | `cement-sand-aggregate-estimator` | `education-lifestyle-tools.js` |
| 177 | Home & Construction | Building Materials & Volume | Gravel Volume Calculator | `gravel-volume-calculator` | `lifestyle-tools.js` |
| 178 | Home & Construction | Room, Surface & Flooring | Paint Quantity Calculator | `paint-quantity-calculator` | `lifestyle-tools.js` |
| 179 | Home & Construction | Room, Surface & Flooring | Tile Quantity Calculator | `tile-quantity-calculator` | `lifestyle-tools.js` |
| 180 | Home & Construction | Room, Surface & Flooring | Flooring Material Estimator | `flooring-material-estimator` | `lifestyle-tools.js` |
| 181 | Home & Construction | Room, Surface & Flooring | Room Area Calculator | `room-area-calculator` | `lifestyle-tools.js` |
| 182 | Home & Construction | Room, Surface & Flooring | Wall Area Calculator | `wall-area-calculator` | `lifestyle-tools.js` |
| 183 | Home & Construction | Roofing & Outdoor Projects | Roofing Area Calculator | `roofing-area-calculator` | `lifestyle-tools.js` |
| 184 | Home & Construction | Roofing & Outdoor Projects | Fence Material Estimator | `fence-material-estimator` | `lifestyle-tools.js` |
| 185 | Everyday Life | Household Cost Calculators | Fuel Cost Calculator | `fuel-cost-calculator` | `lifestyle-tools.js` |
| 186 | Everyday Life | Household Cost Calculators | Electricity Bill Estimator | `electricity-bill-estimator` | `lifestyle-tools.js` |
| 187 | Everyday Life | Shopping & Bill Calculators | Bill Split Calculator | `bill-split-calculator` | `lifestyle-tools.js` |
| 188 | Everyday Life | Shopping & Bill Calculators | Unit Price Comparator | `unit-price-comparator` | `lifestyle-tools.js` |
| 189 | Everyday Life | Commission & Earnings | Sales Commission Calculator | `sales-commission-calculator` | `lifestyle-tools.js` |
| 190 | Developer & Text Tools | QR & Code Utilities | QR Code Generator | `qr-code-generator` | `lifestyle-tools.js` |
| 191 | Health & Wellness | Sleep & Schedule Calculators | Sleep Duration Calculator | `sleep-duration-calculator` | `health-activity-tools.js` |
| 192 | Health & Wellness | Sleep & Schedule Calculators | Bedtime Planner | `bedtime-planner` | `health-activity-tools.js` |
| 193 | Health & Wellness | Sleep & Schedule Calculators | Wake-up Time Planner | `wake-up-time-planner` | `health-activity-tools.js` |
| 194 | Health & Wellness | Sleep & Schedule Calculators | Sleep Schedule Consistency Tracker | `sleep-schedule-consistency-tracker` | `health-activity-tools.js` |
| 195 | Health & Wellness | Sleep & Schedule Calculators | Sleep Log Summary | `sleep-log-summary` | `health-activity-tools.js` |
| 196 | Health & Activity | Pace, Speed & Distance Calculators | Running Pace Calculator | `running-pace-calculator` | `health-activity-tools.js` |
| 197 | Health & Activity | Pace, Speed & Distance Calculators | Running Speed Calculator | `running-speed-calculator` | `health-activity-tools.js` |
| 198 | Health & Activity | Pace, Speed & Distance Calculators | Distance-Time-Pace Calculator | `distance-time-pace-calculator` | `health-activity-tools.js` |
| 199 | Health & Activity | Pace, Speed & Distance Calculators | Race Finish Time Predictor | `race-finish-time-predictor` | `health-activity-tools.js` |
| 200 | Health & Activity | Pace, Speed & Distance Calculators | Race Split Calculator | `race-split-calculator` | `health-activity-tools.js` |
| 201 | Health & Activity | Pace, Speed & Distance Calculators | Walking Pace Calculator | `walking-pace-calculator` | `health-activity-tools.js` |
| 202 | Health & Activity | Pace, Speed & Distance Calculators | Hiking Time Estimator | `hiking-time-estimator` | `health-activity-tools.js` |
| 203 | Health & Activity | Pace, Speed & Distance Calculators | Cycling Speed Calculator | `cycling-speed-calculator` | `health-activity-tools.js` |
| 204 | Health & Activity | Pace, Speed & Distance Calculators | Cycling Time & Distance Calculator | `cycling-time-distance-calculator` | `health-activity-tools.js` |
| 205 | Health & Activity | Pace, Speed & Distance Calculators | Swimming Pace Calculator | `swimming-pace-calculator` | `health-activity-tools.js` |
| 206 | Health & Activity | User-Entered Activity Splits | Swimming Split Calculator | `swimming-interval-planner` | `health-wellness-tools.js` |
| 207 | Health & Activity | User-Entered Activity Splits | Rowing Pace Calculator | `rowing-pace-calculator` | `health-wellness-tools.js` |
| 208 | Health & Wellness | User-Entered Logs & Time Summaries | Session Duration Calculator | `exercise-session-duration-calculator` | `health-wellness-tools.js` |
| 209 | Health & Wellness | User-Entered Logs & Time Summaries | Interval Schedule Calculator | `interval-training-timer` | `health-wellness-tools.js` |
| 210 | Health & Wellness | User-Entered Logs & Time Summaries | Gap Duration Calculator | `rest-interval-planner` | `health-wellness-tools.js` |
| 211 | Health & Wellness | User-Entered Logs & Time Summaries | Time Block Planner | `workout-session-planner-time-only` | `health-wellness-tools.js` |
| 212 | Health & Wellness | User-Entered Logs & Time Summaries | Weekly Time Log Summary | `weekly-activity-minutes-tracker` | `health-wellness-tools.js` |
| 213 | Health & Wellness | User-Entered Logs & Time Summaries | User-Defined Progress Calculator | `activity-goal-progress-tracker` | `health-wellness-tools.js` |
| 214 | Health & Wellness | User-Entered Logs & Time Summaries | Hydration Log Tracker | `hydration-log-tracker` | `health-wellness-tools.js` |
| 215 | Health & Activity | Distance, Steps & Elevation | Step-to-Distance Converter | `step-to-distance-converter` | `health-wellness-tools.js` |
| 216 | Health & Activity | Distance, Steps & Elevation | Distance-to-Step Estimator | `distance-to-step-estimator` | `health-wellness-tools.js` |
| 217 | Health & Activity | Distance, Steps & Elevation | Elevation Gain Rate Calculator | `elevation-gain-rate-calculator` | `health-wellness-tools.js` |
| 218 | Health & Activity | Distance, Steps & Elevation | Hiking Elevation Pace Calculator | `hiking-elevation-pace-calculator` | `health-wellness-tools.js` |
| 219 | Health & Wellness | User-Defined Session Duration | Pattern Duration Calculator | `breathing-exercise-timer` | `health-wellness-tools.js` |
| 220 | Health & Wellness | User-Defined Session Duration | Meditation Session Planner | `meditation-session-planner` | `health-wellness-tools.js` |

## 3. User-visible text inventory by layer

| Layer | Where it lives | Text examples / data shape | Translation treatment |
|---|---|---|---|
| Tool identity | `tool-category-mapping.json`; tool registry definitions | `name`, category, subcategory; stable `id` | Translate names/categories/subcategories; never translate or change IDs |
| Tool description | Tool registry objects in the source file listed above | `desc` | Translate; preserve factual meaning and stated limitations |
| Input labels and controls | Each tool definition's `f` field; rendered by `app.js` `fieldMarkup()` | field tuples such as `[key, label, default, type, options]` | Translate labels and option captions; preserve field keys, types, defaults, numeric values and option machine values |
| Tool-specific explanatory content | Tool definition `seo` objects | `intro`, `faqs` question/answer pairs | Translate as content; do not alter formulas or factual assumptions |
| Calculation result headline | Each tool's `run()` result object | `label`, `main` | Translate label; `main` is generated data and must not be text-translated |
| Result metrics and breakdown | Each tool's `run()` result object | `metrics`, `breakdown`, `schedule`, `series` | Translate metric/item labels; preserve values, units, dates and machine keys |
| Dynamic explanatory result note | Each tool's result object | `note`, assumptions, exclusions, source/rate-date notes | Translate templates and dynamic message fragments; interpolate data safely |
| Validation and error states | Tool `run()` validation and shared `calculate()` error handling in `app.js` | `CHECK YOUR INPUTS`, `e.message`, field-specific validation | Inventory every thrown/returned message; translate user-facing text, not exception identifiers or validation rules |
| Shared calculator UI | `index.html`, `app.js`, `styles.css`, `redesign.css` | navigation, search, buttons, tabs, empty states, history, copy/share/export, formula panel | Translate shared UI once through common message keys |
| Homepage calculator | `home-calculator.js`, `home-calculator-core.js`, `index.html` | Basic/Scientific, keyboard help, history, status text, button labels | Translate labels/help/status; keep operators, tokens and parser semantics unchanged |
| SEO metadata and guide rendering | `index.html`, `app.js` (`ensureToolSeo`, `buildToolMetadata`, `syncToolStructuredData`, `seoMarkup`) and per-tool `seo` objects | title, description, canonical, intro, FAQs, JSON-LD | Translate only when real localized pages/SEO architecture are approved; do not rewrite current English URLs/canonicals in this phase |
| Category directory | `tool-category-mapping.json`, `index.html`, `app.js` (`renderDirectory`) | category/subcategory headings and tool names | Translate display labels only; preserve grouping and tool IDs |

## 4. Dynamic text versus calculation data

### Translate (static text or message templates)
- Tool names, category and subcategory names, descriptions.
- Input labels, select option captions, helper text, units when they are human-readable labels.
- Button text, navigation, tabs, placeholders, tooltips, empty states and status messages.
- Validation messages, error messages, warning/disclaimer text and success/copy/share feedback.
- Result labels, metric names, breakdown item names, chart/diagram accessible labels and explanatory notes.
- SEO guide introductions, FAQ questions/answers, page titles and descriptions after localized SEO pages are explicitly introduced.

### Do not translate or mutate
- Stable tool IDs, field keys, registry keys, DOM selectors, event names, API endpoints and query/share parameter names.
- Formulas, constants, calculation expressions, rounding rules, validation thresholds, tax tables, conversion factors and algorithm branches.
- Numeric inputs/defaults, computed numeric values, timestamps, raw date/time values, currency codes, ISO codes, unit codes and machine-valued select options.
- Formula notation and code examples where translation would change executable or mathematical meaning. Explanatory prose around them may be translated separately.
- Existing English canonical URLs, sitemap entries and structured-data route identity during the preference/UI-only stage.

### Dynamic messages need parameterized localization
Result values must be formatted by locale-aware display functions only after calculation. Message templates should accept typed parameters (numbers, dates, currencies, unit labels, counts) rather than concatenating translated fragments in calculation functions. Locale formatting must not change internal numeric values or imply a different currency, tax jurisdiction, unit system or financial assumption.

## 5. Shared renderer and homepage text hotspots

| File / function | Observed responsibility | Audit action for implementation phase |
|---|---|---|
| `index.html` | Static homepage navigation, calculator shell, directory headings, calculator keyboard help and SEO head metadata | Extract user-visible static copy to shared locale dictionaries; keep default document language English |
| `app.js` — `fieldMarkup()` | Converts tool field definitions into form controls | Translate field labels and option captions at render time; preserve field key/type/value |
| `app.js` — `render()` / result rendering | Renders tool form, result headline, metrics, note, formula, breakdown, schedule and chart | Translate presentation labels only; preserve result data and formula text |
| `app.js` — `calculate()` | Handles validation and calculation exceptions | Route user-facing messages through message keys; preserve thrown validation conditions |
| `app.js` — `ensureToolSeo()`, `buildToolMetadata()`, `syncToolStructuredData()`, `seoMarkup()` | Generates page metadata and explanatory guide/FAQ markup | Separate UI language preference from localized SEO route generation; no hreflang until translated pages exist |
| `app.js` — history/share/copy utilities | Recent calculation labels, restore, copy/share feedback and URL state | Translate UI feedback; keep stored record schema and URL parameter contract stable |
| `home-calculator.js` | Basic/scientific calculator buttons, keyboard hint, recent history, status and copy feedback | Translate visible controls and announcements; preserve expression tokens and parser contract |
| Tool registry modules | Tool-specific labels, options, descriptions, FAQs, notes, result metrics and validation text | Extract all literal user-visible strings; identify runtime-generated fragments and values separately |

## 6. Coverage status and remaining extraction work

| Audit item | Status | Evidence / next action |
|---|---|---|
| Canonical tool count | **Verified: 220/220** | Mapping declares expected=220, actual=220, unique IDs=220, unassigned=0 |
| Tool ID/name/category/subcategory/source-file map | **Verified: 220/220 records** | Complete table in Section 2 |
| Source ownership by tool | **Verified: 220/220** | Ten source files listed in Section 1 |
| Field-label and option-caption literal extraction | **Not yet exhaustive** | Requires parsing all field definitions and dynamic option builders in each registry; build a string-key catalogue before translation |
| Dynamic validation/error message extraction | **Not yet exhaustive** | Trace each tool's `run()` and shared `calculate()` error paths; include thrown errors and conditional messages |
| Result labels, metrics, breakdowns and notes extraction | **Not yet exhaustive** | Inventory all result object shapes and computed string fragments without changing calculations |
| All FAQ/SEO intro content extraction | **Not yet exhaustive** | Count/extract all `seo.intro` and `seo.faqs`; distinguish tool guide copy from shared fallback copy |
| Shared homepage/static UI extraction | **Identified, not yet key-catalogued** | `index.html`, `app.js`, `home-calculator.js`, CSS accessibility labels and chart SVG labels |
| Runtime translation coverage | **Not started** | No runtime translation engine or locale dictionaries added in this documentation phase |

**Completion statement:** The 220-tool identity/source inventory is complete. The exhaustive literal-string catalogue (every label/message/FAQ/result fragment with exact source location) remains a required subtask before the translation engine is implemented. It would be inaccurate to claim that all 220 tools' individual strings have already been extracted.

## 7. Acceptance gates before implementation
1. Produce a machine-auditable string catalogue with stable message keys, exact source file/definition owner, text class (static/dynamic/SEO/accessibility), interpolation parameters and protected machine values.
2. Reconcile catalogue coverage against exactly 220 canonical tool IDs; every tool must have an explicit inspected status, including tools with no extra strings beyond shared UI.
3. Add tests that assert locale changes do not mutate tool IDs, field keys, formula definitions, numeric parsing, calculation outputs or existing English query/share URLs.
4. Keep English as default and preserve existing canonical/sitemap URLs until localized static pages are independently generated, tested and approved.
5. Implement RTL only at the presentation layer; verify Arabic and Urdu layout without changing input direction for numeric/formula fields where LTR is required.
6. Verify all seven locales for missing-key fallback, pluralization, interpolation, keyboard/accessibility announcements, responsive layout and representative tool calculations.

## 8. Non-goals of this inventory commit
- No edits to runtime JS, HTML, CSS, formulas, tool registries or tool-category mapping.
- No locale selector, language persistence, translation dictionaries or translated copy.
- No localized route, canonical, hreflang, sitemap or deployment change.
- No claim that browser tests, Lighthouse, accessibility or production deployment were rerun by this documentation-only inventory.


## 8. Exact literal extraction update (2026-11-21)

A source-literal catalogue has now been generated for all 220 tool definition segments: 4,724 quoted/template literal occurrences across the ten owning modules, with Tool ID, source file, absolute line, static/dynamic-fragment hint, heuristic protected/candidate classification and surrounding source context. See `MULTILINGUAL_TOOL_STRING_CATALOGUE.md` and its per-module JSON files. An additional 2,212 shared UI/homepage occurrences are catalogued in `MULTILINGUAL_SHARED_UI_STRING_CATALOGUE.md` and three per-source JSON files. These are exhaustive lexical captures for the scoped files, not a human-reviewed translation allowlist; runtime-generated values, imported/core messages and protected interpolation parameters still require review.
