function register_events_blocked() {
	$('#btn-block-add').click(function (e) {
		e.preventDefault();
		$('#modal-block').modal('show');
		$("#form-block-ip").removeAttr("readonly");
	});

	$('#form-block-submit').click(function (e) {
		e.preventDefault();
		$('#modal-block').modal('hide');
		var ip = $("#form-block-ip").val();
		var time = $("#form-block-time").val();
		var type = !time || time > 0 ? "block" : "unblock";
		var ajax = $.ajax({
			url: window.config.BASE_URL + "/service?action=" + type,
			type: 'POST',
			data: {
				ip: ip,
				time: time
			}
		});
		ajax.done(function (res) {
			if (res["errno"] === 0) {
				$('#table-block').bootstrapTable("refresh");
				$('#form-block-ip').val('');
				$('#form-block-time').val('');
			} else {
				$('#modal-msg').modal('show');
				$("#modal-msg-content").text(res['msg']);
			}
		});
		ajax.fail(function (jqXHR, textStatus) {
			$('#modal-msg').modal('show');
			$("#modal-msg-content").text("Request failed :" + textStatus);
		});
	});
}

function load_list_blocked() {
	$("#table-block").bootstrapTable({
		url: window.config.BASE_URL + '/service?action=list_blocked',
		responseHandler: blockedResponseHandler,
		cache: true,
		striped: true,
		pagination: true,
		pageSize: 10,
		pageList: [25, 50, 100, 200],
		search: true,
		showColumns: true,
		showRefresh: true,
		showToggle: false,
		showPaginationSwitch: true,
		minimumCountColumns: 2,
		clickToSelect: false,
		sortName: 'nobody',
		sortOrder: 'desc',
		smartDisplay: true,
		mobileResponsive: true,
		showExport: false,
		columns: [{
			field: 'nobody',
			title: 'Select',
			checkbox: true
		}, {
			field: 'id',
			title: 'IP',
			align: 'center',
			valign: 'middle'
		}, {
			field: 'operate',
			title: 'Operations',
			align: 'center',
			events: blockedOperateEvents,
			formatter: blockedOperateFormatter
		}]
	});
}

function blockedResponseHandler(res) {
	if (res['errno'] === 0) {
		return res["list"];
	}
	$('#modal-msg').modal('show');
	$("#modal-msg-content").text(res['msg']);
	return [];
}

function blockedOperateFormatter(value, row, index) {
	return [
		'<button class="btn btn-default view">',
		'<i class="glyphicon glyphicon-eye-open"></i>&nbsp;View',
		'</button>'
	].join('');
}

window.blockedOperateEvents =
	{
		'click .view': function (e, value, row, index) {
			var ajax = $.ajax({
				url: window.config.BASE_URL + "/service?action=get_blocked_time",
				type: 'POST',
				data: {
					ip: row.id
				}
			});
			ajax.done(function (res) {
				if (res["errno"] === 0) {
					$('#modal-block').modal('show');
					$('#form-block-ip').val(row.id);
					$('#form-block-time').val(res['time']);
					$('#form-block-ip').attr('readonly', 'readonly');
				} else {
					$('#modal-msg').modal('show');
					$('#modal-msg-content').text(res['msg']);
					$('#table-block').bootstrapTable("refresh");
				}
			});
			ajax.fail(function (jqXHR, textStatus) {
				$('#modal-msg').modal('show');
				$("#modal-msg-content").text("Request failed :" + textStatus);
			});
		}
	};
