def calculate_overtime_pay(base_salary, overtime_hours, working_days=20):
    # 1日の所定労働時間
    daily_working_hours = 7.75
    # 月間所定労働時間
    monthly_working_hours = daily_working_hours * working_days
    
    # 時間外労働の割増率 (1.25倍)
    overtime_rate = 1.25
    
    # 基本給を月間所定労働時間で割る
    hourly_wage = base_salary / monthly_working_hours
    
    # 残業代の計算
    overtime_pay = hourly_wage * overtime_hours * overtime_rate
    
    return overtime_pay

def calculate_social_insurance(total_salary):
    # 厚生年金保険料率（労使折半）
    pension_insurance_rate = 0.0915
    
    # 厚生年金保険料の計算
    pension_insurance = total_salary * pension_insurance_rate
    
    # 社会保険料の合計
    total_social_insurance = pension_insurance
    
    return total_social_insurance

def calculate_withholding_tax(total_salary, social_insurance):
    # 課税所得の計算
    taxable_income = total_salary - social_insurance - 480000 / 12  # 基礎控除48万円（月割）
    
    if taxable_income <= 0:
        return 0
    
    # 累進課税の計算
    withholding_tax = 0
    if taxable_income <= 1950000 / 12:
        withholding_tax = taxable_income * 0.05
    elif taxable_income <= 3300000 / 12:
        withholding_tax = (taxable_income - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05
    elif taxable_income <= 6950000 / 12:
        withholding_tax = (taxable_income - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05
    elif taxable_income <= 9000000 / 12:
        withholding_tax = (taxable_income - 6950000 / 12) * 0.23 + (6950000 / 12 - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05
    elif taxable_income <= 18000000 / 12:
        withholding_tax = (taxable_income - 9000000 / 12) * 0.33 + (9000000 / 12 - 6950000 / 12) * 0.23 + (6950000 / 12 - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05
    elif taxable_income <= 40000000 / 12:
        withholding_tax = (taxable_income - 18000000 / 12) * 0.4 + (18000000 / 12 - 9000000 / 12) * 0.33 + (9000000 / 12 - 6950000 / 12) * 0.23 + (6950000 / 12 - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05
    else:
        withholding_tax = (taxable_income - 40000000 / 12) * 0.45 + (40000000 / 12 - 18000000 / 12) * 0.4 + (18000000 / 12 - 9000000 / 12) * 0.33 + (9000000 / 12 - 6950000 / 12) * 0.23 + (6950000 / 12 - 3300000 / 12) * 0.2 + (3300000 / 12 - 1950000 / 12) * 0.1 + (1950000 / 12) * 0.05
    
    return withholding_tax

def calculate_total_salary(base_salary, overtime_hours, working_days=20):
    overtime_pay = calculate_overtime_pay(base_salary, overtime_hours, working_days)
    
    # 総月給の計算
    total_salary = base_salary + overtime_pay
    
    # 社会保険料の計算
    social_insurance = calculate_social_insurance(total_salary)
    
    # 源泉所得税の計算
    withholding_tax = calculate_withholding_tax(total_salary, social_insurance)
    
    # 手取りの計算
    net_salary = total_salary - social_insurance - withholding_tax
    
    return overtime_pay, total_salary, social_insurance, withholding_tax, net_salary

# 基本給と残業時間を入力として受け取る
base_salary = float(input("基本給を入力してください（円）: "))
overtime_hours = float(input("残業時間を入力してください（時間）: "))

# 残業代、総月給、社会保険料、源泉所得税、手取りを計算
overtime_pay, total_salary, social_insurance, withholding_tax, net_salary = calculate_total_salary(base_salary, overtime_hours)

# 結果を表示
print(f"残業代: {overtime_pay:.2f} 円")
print(f"総月給: {total_salary:.2f} 円")
print(f"厚生年金保険料: {social_insurance:.2f} 円")
print(f"源泉所得税: {withholding_tax:.2f} 円")
print(f"手取り月給: {net_salary:.2f} 円")