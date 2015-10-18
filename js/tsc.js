$(function() {
	// Шаблонизация списка документов - jQuery Templates
	var requests = (function(){ 
		var data = [
			{
				id: '1000000',
				number: 'Z0000288AC',
				createdDateTime: '2015-08-04',
				clientOPF: 'ООО',
				clientName: 'ВГТРК Россия',
				requestType: 'simple',
				requestTypeName: 'Обычная',
				requestStatus: 'draft',
				requestStatusName: 'Черновик',
				meetingDate: '2015-08-04'
			},
			{
				id: '1000001',
				number: 'H7289287',
				createdDateTime: '2015-07-29',
				clientOPF: 'ИП',
				clientName: 'Третьяков. К.С.',
				requestType: 'extended',
				requestTypeName: 'Специальная',
				requestStatus: 'confirmed',
				requestStatusName: 'Подтверждено СЭБ',
				meetingDate: '2015-08-20'
			},
			{
				id: '1000002',
				number: 'Z0000288AC',
				createdDateTime: '2015-08-04',
				clientOPF: 'ЗАО',
				clientName: 'Донстрой',
				requestType: 'simple',
				requestTypeName: 'Обычная',
				requestStatus: 'suspense',
				requestStatusName: 'Ожидание',
				meetingDate: '2015-08-20'
			},
			{
				id: '1000003',
				number: 'H7289287',
				createdDateTime: '2015-07-29',
				clientOPF: 'ИП',
				clientName: 'Третьяков. К.С.',
				requestType: 'extended',
				requestTypeName: 'Специальная',
				requestStatus: 'departure',
				requestStatusName: 'Выезд',
				meetingDate: '2015-08-20'
			},
			{
				id: '1000004',
				number: 'Z0000288AC',
				createdDateTime: '2015-08-04',
				clientOPF: 'ЗАО',
				clientName: 'Донстрой',
				requestType: 'simple',
				requestTypeName: 'Обычная',
				requestStatus: 'rejected',
				requestStatusName: 'Отказано',
				meetingDate: '2015-08-20'
			},
			{
				id: '1000005',
				number: 'H7289287',
				createdDateTime: '2015-07-29',
				clientOPF: 'ИП',
				clientName: 'Третьяков. К.С.',
				requestType: 'extended',
				requestTypeName: 'Специальная',
				requestStatus: 'confirmed',
				requestStatusName: 'Подтверждено СЭБ',
				meetingDate: '2015-08-20'
			},
			{
				id: '1000006',
				number: 'H7289287',
				createdDateTime: '2015-07-29',
				clientOPF: 'ИП',
				clientName: 'Третьяков. К.С.',
				requestType: 'extended',
				requestTypeName: 'Специальная',
				requestStatus: 'rework',
				requestStatusName: 'Выезд',
				meetingDate: '2015-08-20'
			},
			{
				id: '1000007',
				number: 'H7289287',
				createdDateTime: '2015-07-29',
				clientOPF: 'ИП',
				clientName: 'Третьяков. К.С.',
				requestType: 'extended',
				requestTypeName: 'Специальная',
				requestStatus: 'approved',
				requestStatusName: 'Согласовано',
				meetingDate: '2015-08-20'
			},
			{
				id: '1000008',
				number: 'H7289287',
				createdDateTime: '2015-07-29',
				clientOPF: 'ИП',
				clientName: 'Третьяков. К.С.',
				requestType: 'extended',
				requestTypeName: 'Специальная',
				requestStatus: 'confirmed',
				requestStatusName: 'Подтверждено СЭБ',
				meetingDate: '2015-08-20'
			}
		];
		for (var i = 0; i < data.length; ++i) data[i].rowNo = i;
		return data;
	})();
	
	var tmplRequestList = $('#tmplRequestList').html(); // Содержит HTML-шаблон
	var container = $('div.cnt-claims div.table-wrap.body').empty(); // Куда срендерить шаблон
	$.tmpl(tmplRequestList, { rows: requests }, {moment: moment}).appendTo(container);
	
	// 2-way binding для простой формы заявки (часть полей для примера) - Knockout.js
	var requestSimple = { // Данные для формы
		meetingDate: '2012-01-01',
		meetingSurname: 'Иванов',
		meetingName: 'Иван',
		meetingFathersName: 'Иванович',
		meetingPhone: '+79102342312',
		meetingEmail: 'sample@sample.com',
		number: '2651678',
		meetingStreet: ''
	};
	
	// Привязка данных к форме
	var frm = $('#claimForm');
	var viewModel = ko.mapping.fromJS(requestSimple);
	ko.applyBindings(viewModel, frm[0]);
	
	// Демострация 2-стороннего биндинга - при изменении данных пользователем на форме меняется viewModel
	frm.find('input[type=submit]').click(function(){
		var data = ko.mapping.toJS(viewModel);
		alert(data.meetingSurname);
	});
});