document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const totalSalary = parseFloat(urlParams.get('totalSalary'));
    const socialInsurance = parseFloat(urlParams.get('socialInsurance'));
    const withholdingTax = parseFloat(urlParams.get('withholdingTax'));
    const netSalary = parseFloat(urlParams.get('netSalary'));

    const ctx = document.getElementById('salaryChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['総月給', '厚生年金保険料', '源泉所得税', '手取り月給'],
            datasets: [{
                label: '給与内訳 (円)',
                data: [totalSalary, socialInsurance, withholdingTax, netSalary],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});