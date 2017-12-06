var data = [
	{x: 1, y: 1},
	{x: 2, y: 3},
	{x: 4, y: 3},
	{x: 3, y: 2},
	{x: 5, y: 5},
]
function LinearPrediction(new_y){
	this.new_y = new_y
	this.data = data
	this.mean_x = 0
	this.mean_y = 0
	this.mean_data = []
	this.nom = 0
	this.denom = 0
	this.slop = 0
	this.bias = 0
}
LinearPrediction.prototype.getPrediction = function(){
	this.CalculateMean()
	this.CalculateMeanError()
	this.CalculateSlop()
	this.CalculateBias()
	return parseFloat((this.bias + this.slop * this.new_y).toFixed(2))
}
LinearPrediction.prototype.CalculateMean = function(){
	for(var i = 0; i < this.data.length; i++){
		this.mean_x += this.data[i]['x']
		this.mean_y += this.data[i]['y']
	}
	this.mean_x = Math.round((this.mean_x / this.data.length) * 100) / 100
	this.mean_y = Math.round((this.mean_y / this.data.length) * 100) / 100
}
LinearPrediction.prototype.CalculateMeanError = function(){
	for(var i = 0; i < this.data.length; i++){
		this.mean_data.push({x: this.data[i]['x'] - this.mean_x, y: parseFloat((this.data[i]['y'] - this.mean_y).toFixed(2))})
	}
}
LinearPrediction.prototype.CalculateSlop = function(){
	for(var i = 0; i < this.data.length; i++){
		this.nom += this.mean_data[i]['x'] * this.mean_data[i]['y']
		this.denom += this.mean_data[i]['x'] * this.mean_data[i]['x']
	}
	this.slop = this.nom / this.denom
}
LinearPrediction.prototype.CalculateBias = function(){
	this.bias = this.mean_y - this.slop * this.mean_x
}
