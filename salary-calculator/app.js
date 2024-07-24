const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

function calculateOvertimePay(baseSalary, overtimeHours, workingDays = 20) {
    const dailyWorkingHours = 7.75;
    const monthlyWorkingHours = dailyWorkingHours * workingDays;
    const overtimeRate = 1.25;
    const hourlyWage = baseSalary / monthlyWorkingHours;
    const overtimePay = hourlyWage * overtimeHours * overtimeRate;
    return overtimePay;
}

function calculateSocialInsurance(totalSalary) {
    const pensionInsuranceRate = 0.0915;
    const pensionInsurance = totalSalary * pensionInsuranceRate;
    const totalSocialInsurance = pensionInsurance;
    return totalSocialInsurance;
}

function calculateWithholdingTax(totalSalary, socialInsurance) {
    const taxableIncome = totalSalary - socialInsurance - 480000 / 12;
    if (taxableIncome <= 0) {
        return 0;
    }

    let withholdingTax = 0;
    if (taxableIncome <= 1950000 / 12) {
        withholdingTax = taxableIncome * 0.05;
    } else if (taxableIncome <= 3300000 / 12) {
        withholdingTax = (taxableIncome - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05;
    } else if (taxableIncome <= 6950000 / 12) {
        withholdingTax = (taxableIncome - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05;
    } else if (taxableIncome <= 9000000 / 12) {
        withholdingTax = (taxableIncome - 6950000 / 12) * 0.23 + (6950000 / 12 - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05;
    } else if (taxableIncome <= 18000000 / 12) {
        withholdingTax = (taxableIncome - 9000000 / 12) * 0.33 + (9000000 / 12 - 6950000 / 12) * 0.23 + (6950000 / 12 - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05;
    } else if (taxableIncome <= 40000000 / 12) {
        withholdingTax = (taxableIncome - 18000000 / 12) * 0.4 + (18000000 / 12 - 9000000 / 12) * 0.33 + (9000000 / 12 - 6950000 / 12) * 0.23 + (6950000 / 12 - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05;
    } else {
        withholdingTax = (taxableIncome - 40000000 / 12) * 0.45 + (40000000 / 12 - 18000000 / 12) * 0.4 + (18000000 / 12 - 9000000 / 12) * 0.33 + (9000000 / 12 - 6950000 / 12) * 0.23 + (6950000 / 12 - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05;
    }

    return withholdingTax;
}

function calculateTotalSalary(baseSalary, overtimeHours, workingDays = 20) {
    const overtimePay = calculateOvertimePay(baseSalary, overtimeHours, workingDays);
    const totalSalary = baseSalary + overtimePay;
    const socialInsurance = calculateSocialInsurance(totalSalary);
    const withholdingTax = calculateWithholdingTax(totalSalary, socialInsurance);
    const netSalary = totalSalary - socialInsurance - withholdingTax;
    return { overtimePay, totalSalary, socialInsurance, withholdingTax, netSalary };
}

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/calculate', (req, res) => {
    const baseSalary = parseFloat(req.body.base_salary);
    const overtimeHours = parseFloat(req.body.overtime_hours);
    const result = calculateTotalSalary(baseSalary, overtimeHours);

    // Ensure the values are numbers
    res.json({
        overtimePay: result.overtimePay,
        totalSalary: result.totalSalary,
        socialInsurance: result.socialInsurance,
        withholdingTax: result.withholdingTax,
        netSalary: result.netSalary
    });
});

app.get('/result', (req, res) => {
    const overtimePay = parseFloat(req.query.overtimePay);
    const totalSalary = parseFloat(req.query.totalSalary);
    const socialInsurance = parseFloat(req.query.socialInsurance);
    const withholdingTax = parseFloat(req.query.withholdingTax);
    const netSalary = parseFloat(req.query.netSalary);

    res.render('result', {
        overtimePay: overtimePay,
        totalSalary: totalSalary,
        socialInsurance: socialInsurance,
        withholdingTax: withholdingTax,
        netSalary: netSalary
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});