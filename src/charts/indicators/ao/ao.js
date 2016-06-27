﻿/**
 * Created by Mahboob.M on 2/3/16.
 */

define(["jquery", "common/rivetsExtra", "jquery-ui", 'color-picker', 'ddslick'], function($, rv) {

    function closeDialog() {
        $(this).dialog("close");
        $(this).find("*").removeClass('ui-state-error');
    }

    function init( containerIDWithHash, _callback ) {

        require(['css!charts/indicators/ao/ao.css']);

        var Level = function (level, stroke, strokeWidth, dashStyle) {
            this.level = level;
            this.stroke = stroke;
            this.strokeWidth = strokeWidth;
            this.dashStyle = dashStyle;
        };
        var defaultLevels = [new Level(30, 'red', 1, 'Dash'), new Level(70, 'red', 1, 'Dash')];

        require(['text!charts/indicators/ao/ao.html', 'text!charts/indicators/indicators.json'], function ( $html, data ) {

            var defaultHighStrokeColor = '#57a125';
            var defaultLowStrokeColor = '#cd0a0a';

            $html = $($html);
            //$html.hide();
            $html.appendTo("body");

            data = JSON.parse(data);
            var current_indicator_data = data.ao;
            var state = {
                "title": current_indicator_data.long_display_name,
                "description": current_indicator_data.description
            }
            rv.bind($html[0], state);

            $html.find("input[type='button']").button();

            $html.find("#ao_high_hstgrm_color").colorpicker({
                position: {
                    at: "right+100 bottom",
                    of: "element",
                    collision: "fit"
                },
                part: {
                    map: { size: 128 },
                    bar: { size: 128 }
                },
                select: function (event, color) {
                    $("#ao_high_hstgrm_color").css({
                        background: '#' + color.formatted
                    }).val('');
                    defaultHighStrokeColor = '#' + color.formatted;
                },
                ok: function (event, color) {
                    $("#ao_high_hstgrm_color").css({
                        background: '#' + color.formatted
                    }).val('');
                    defaultHighStrokeColor = '#' + color.formatted;
                }
            });

            $html.find("#ao_low_hstgrm_color").colorpicker({
                position: {
                    at: "right+100 bottom",
                    of: "element",
                    collision: "fit"
                },
                part: {
                    map: { size: 128 },
                    bar: { size: 128 }
                },
                select: function (event, color) {
                    $("#ao_low_hstgrm_color").css({
                        background: '#' + color.formatted
                    }).val('');
                    defaultLowStrokeColor = '#' + color.formatted;
                },
                ok: function (event, color) {
                    $("#ao_low_hstgrm_color").css({
                        background: '#' + color.formatted
                    }).val('');
                    defaultLowStrokeColor = '#' + color.formatted;
                }
            });


            var selectedDashStyle = "Solid";
            $('#ao_dashStyle').ddslick({
                imagePosition: "left",
                width: 158,
                background: "white",
                onSelected: function (data) {
                    $('#ao_dashStyle .dd-selected-image').css('max-width', '125px');
                    selectedDashStyle = data.selectedData.value
                }
            });
            $('#ao_dashStyle .dd-option-image').css('max-width', '125px');


            var table = $html.find('#ao_levels').DataTable({
                paging: false,
                scrollY: 100,
                autoWidth: true,
                searching: false,
                info: false,
                "columnDefs": [
                   { className: "dt-center", "targets": [0,1,2,3] },
                ],
                "aoColumnDefs": [{ "bSortable": false, "aTargets": [1, 3] }]

            });

            $.each(defaultLevels, function (index, value) {
                $(table.row.add([value.level, '<div style="background-color: ' + value.stroke + ';width:100%;height:20px;"></div>', value.strokeWidth,
                    '<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/' + value.dashStyle + '.svg" /></div>']).draw().node())
                    .data("level", value)
                    .on('click', function () {
                        $(this).toggleClass('selected');
                    });
            });
            $html.find('#ao_level_delete').click(function () {
                if (table.rows('.selected').indexes().length <= 0) {
                    require(["jquery", "jquery-growl"], function($) {
                        $.growl.error({ message: "Select level(s) to delete!" });
                    });
                } else {
                    table.rows('.selected').remove().draw();
                }
            });
            $html.find('#ao_level_add').click(function () {
                require(["indicator_levels"], function(ao_level) {
                    ao_level.open(containerIDWithHash, function (levels) {
                        $.each(levels, function (ind, value) {
                            $(table.row.add([value.level, '<div style="background-color: ' + value.stroke + ';width:100%;height:20px;"></div>', value.strokeWidth,
                                '<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/' + value.dashStyle + '.svg" /></div>']).draw().node())
                                .data("level", value)
                                .on('click', function () {
                                    $(this).toggleClass('selected');
                                } );
                        });
                    });
                });
            });

            $html.dialog({
                autoOpen: false,
                resizable: false,
                width: 450,
                height: 400,
                modal: true,
                my: 'center',
                at: 'center',
                of: window,
                dialogClass:'ao-ui-dialog',
                buttons: [
                    {
                        text: "OK",
                        click: function() {
                            var isValid = true;
                            $(".ao_input_width_for_period").each(function () {
                                var $elem = $(this);
                                if (!_.isInteger(_.toNumber($elem.val())) || !_.inRange($elem.val(), parseInt($elem.attr("min")), parseInt($elem.attr("max")) + 1)) {
                                    require(["jquery", "jquery-growl"], function ($) {
                                        $.growl.error({
                                            message: "Only numbers between " + $elem.attr("min")
                                                    + " to " + $elem.attr("max")
                                                    + " is allowed for " + $elem.closest('tr').find('td:first').text() + "!"
                                        });
                                    });
                                    $elem.val($elem.prop("defaultValue"));
                                    isValid = false;
                                    return;
                                }
                            });

                            if (!isValid) return;

                            var levels = [];
                            $.each(table.rows().nodes(), function () {
                                var data = $(this).data('level');
                                if (data) {
                                    levels.push({
                                        color: data.stroke,
                                        dashStyle: data.dashStyle,
                                        width: data.strokeWidth,
                                        value: data.level,
                                        label: {
                                            text: data.level
                                        }
                                    });
                                }
                            });
                            var options = {
                                shortPeriod: parseInt($html.find("#ao_short_term_period").val()),
                                longPeriod: parseInt($html.find("#ao_long_term_period").val()),
                                shortMaType: $("#ao_short_ma_type").val(),
                                longMaType: $("#ao_long_ma_type").val(),
                                aoHighStroke: defaultHighStrokeColor,
                                aoLowStroke: defaultLowStrokeColor,
                                levels: levels
                            };
                            //Add AO for the main series
                            $($(".ao").data('refererChartID')).highcharts().series[0].addIndicator('ao', options);

                            closeDialog.call($html);

                        }
                    },
                    {
                        text: "Cancel",
                        click: function() {
                            closeDialog.call(this);
                        }
                    }
                ]
            });
            $html.find('select').selectmenu({
                width : 160
            });

            if (typeof _callback == "function")
            {
                _callback( containerIDWithHash );
            }

        });

    }

    return {

        open : function ( containerIDWithHash ) {

            if ($(".ao").length == 0)
            {
                init( containerIDWithHash, this.open );
                return;
            }

            $(".ao").data('refererChartID', containerIDWithHash).dialog( "open" );

        }

    };

});
