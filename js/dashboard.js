jQuery(function() {

    var pikadayLocaleRu = {
        previousMonth: 'Предыдущий месяц',
        nextMonth: 'Следующий месяц',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    };

    // Выпадайки в шапке
    // $('#request-status').dropit();
    // $('#request-type').dropit();
    $('.dropit').each(function(index, el) {
        $(el).dropit();
    });
    // При выборе элемента меню, изменим надпись дяди (сиблинга родителя этого элемента)
    $('.toolbar .dropit-submenu').click(function(event) {
        var menuItem = $(event.target);
        if (menuItem.is('a')) {
            $(this).prev().text(menuItem.text());
        }
    });
    // В форме при выборе элемента подставим значение в соседний input
    $('form .dropit-submenu').click(function(event) {
        var menuItem = $(event.target);
        if (menuItem.is('a')) {
            $(this).closest('.dropdown-input').find('input').val(menuItem.attr('data-val')).valid();
            $(this).prev().text(menuItem.text());
        }
    });

    moment.locale('ru');
    window.pikadays = [];

    function createDatepicker(elementId) {
        var picker = new Pikaday({
            field: document.getElementById(elementId),
            format: 'DD MMMM YYYY',
            i18n: pikadayLocaleRu,
            onSelect: function(date) {
                // Запишем дату в соседний input
                var input = $('#' + elementId).closest('.datepicker-wrap').prev();
                if (input.is('input')) {
                    input.val(date.toISOString());
                }
            },
            // minDate: moment("1950-01-01").toDate(),
            yearRange: [moment(new Date()).subtract(70, 'years').year(), moment(new Date()).year()]
        });
        window.pikadays.push(picker);
    }

    $('.datepicker').each(function() {
        createDatepicker(this.id);
    });

    // Переключение синей шапки таблицы
    $('[data-action-bar-toggle]').click(function(event) {
        $('.action-cnt').toggleClass('action-on');
    });

    // Подсветка строки таблицы при переключении флажка первой колонки
    // var totalSelected = 0;
    // $('table.claims .styled_ch input').change(function(event) {
    //     var input = $(event.target);
    //     input.closest('tr').toggleClass('selected');
    //     totalSelected += input.is(':checked') ? 1 : -1;
    //     totalSelected > 0 ? $('.action-cnt').addClass('action-on') : $('.action-cnt').removeClass('action-on');
    //     $('#selectedCount').text(totalSelected);
    // });

    // Подсветка строки таблицы (и активация чекбокса) при клике на ней
    var totalSelected = 0;
    $('table.target-claims tr').click(function(event) {
        if (!$(event.target).is('.styled_ch span')) {
            console.log(event.target);
            var row = $(this);
            if (!$(event.target).is('input')) {
                row.find('.styled_ch input').prop('checked', row.find('.styled_ch input').is(':checked') ? false : true);
            }
            row.toggleClass('selected');
            totalSelected += row.is('.selected') ? 1 : -1;
            totalSelected > 0 ? $('.action-cnt').addClass('action-on') : $('.action-cnt').removeClass('action-on');
            $('#selectedCount').text(totalSelected);
        }
    });

    var inputs = $('table.claims .styled_ch input');
    $('#selectAll').click(function(event) {
        inputs.prop("checked", true);
        inputs.closest('tr').addClass('selected');
        totalSelected = inputs.length;
        $('#selectedCount').text(totalSelected);
    });

    $('#deselectAll').click(function(event) {
        inputs.prop("checked", false);
        inputs.closest('tr').removeClass('selected');
        totalSelected = 0;
        $('#selectedCount').text(totalSelected);
    });

    // Модальные окна
    function arcticPrepare(stage) {
        if (stage === 'open') {
            $('.menubar').css('padding-right', '17px');
        } else if (stage === 'close') {
            $('.menubar').css('padding-right', 0);
        }
    }
    var arcticParams = {
        beforeOpen: arcticPrepare.bind(null, 'open'),
        afterClose: arcticPrepare.bind(null, 'close'),
        overlay: {
            css: {
                backgroundColor: '#000',
                opacity: .8
            }
        }
    };

    // Открытие попапов
    $('[data-modal]').each(function(index, el) {
        $(el).click(function(event) {
            console.log('trying to open .' + el.getAttribute('data-modal'));
            $('.' + el.getAttribute('data-modal')).arcticmodal(arcticParams)
            event.preventDefault();
        });
    });

    $('.close-modal').click(function(event) {
        $.arcticmodal('close');
    });

    jQuery.extend(jQuery.validator.messages, {
        required: 'Обязательное поле'
    });

    var validatorParams = {
        ignore: '.ignore',
        messages: {
            required: 'Обязательное поле',
            meeting_date: 'Выберите дату встречи',
            meeting_hour: 'Выберите час встречи',
            meeting_minutes: 'Выберите минуты встречи',
            meeting_surname: 'Укажите фамилию',
            meeting_name: 'Укажите имя',
            meeting_phone: 'Введите номер телефона',
            meeting_district: 'Выберите область',
            meeting_city: 'Выберите город',
            meeting_street: 'Укажите улицу',
            meeting_building: 'Введите номер дома',
            meeting_office: 'Укажите офис'
        }
    };

    $('#formClaim').validate(validatorParams);
    $('#formClaimBig').validate(validatorParams);

    $('[data-trigger="add-new-founder"]').click(function(event) {
        $(this).toggleClass('active');
        $('.add-new-founder').toggleClass('hidden');
    });

    Ps.initialize(document.getElementById('history-chat'));

    function showTab(id) {
        $('[data-tab]').hide();
        $('[data-tab="' + id + '"]').show();
        $('[data-show-tab]').removeClass('active');
        $('[data-show-tab="' + id + '"]').addClass('active');
    }

    $('[data-show-tab]').click(function(event) {
        showTab(this.getAttribute('data-show-tab'));
    });
});