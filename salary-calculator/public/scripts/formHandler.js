document.getElementById('salaryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const baseSalary = document.getElementById('base_salary').value;
    const overtimeHours = document.getElementById('overtime_hours').value;

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `base_salary=${baseSalary}&overtime_hours=${overtimeHours}`
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = `/result?overtimePay=${data.overtimePay}&totalSalary=${data.totalSalary}&socialInsurance=${data.socialInsurance}&withholdingTax=${data.withholdingTax}&netSalary=${data.netSalary}`;
    })
    .catch(error => console.error('Error:', error));
});