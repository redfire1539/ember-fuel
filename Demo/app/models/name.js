var Model = DS.Model.extend({
	firstName: DS.attr('string'),
	middleName: DS.attr('string')
});

Model.reopenClass({
	FIXTURES: [
		{ id: 1, firstName: 'Tyler',  middleName: 'Dean' },
		{ id: 2, firstName: 'Julie',  middleName: 'Marie' },
		{ id: 3, firstName: 'Hannah', middleName: 'Beth' },
		{ id: 4, firstName: 'Luke',   middleName: 'Wallace' }
	]
});

export default Model;