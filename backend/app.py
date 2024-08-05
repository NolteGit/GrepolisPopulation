from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

# Calculate maximum population based on farm level
def calculate_max_population(farm_level, therme=False, plow=False):
    base_population = farm_level * 100
    if therme:
        base_population *= 1.10
    if plow:
        base_population += 200
    return min(base_population, 4116)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update_population', methods=['POST'])
def update_population():
    farm_level = int(request.form['farm_level'])
    therme = request.form.get('therme') == 'true'
    plow = request.form.get('plow') == 'true'
    unit_population = int(request.form['unit_population'])
    building_population = int(request.form['building_population'])
    
    max_population = calculate_max_population(farm_level, therme, plow)
    current_population = max_population - (unit_population + building_population)
    
    response = {
        'current_population': current_population,
        'max_population': max_population,
        'unit_population': unit_population,
        'building_population': building_population
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
