document.addEventListener("DOMContentLoaded", function () {
    fetch('courses.json')
        .then(function (response) { return response.json(); })
        .then(function (courses) {
        var grid = document.getElementById('coursesGrid');
        if (!grid)
            return;
        grid.innerHTML = '';
        courses.forEach(function (course) {
            var _a, _b, _c;
            var card = document.createElement('div');
            card.className = 'course-card';
            if (course.expired) {
                card.innerHTML += "<span class=\"expired\">EXPIRED</span>";
            }
            // Handle class array for select options
            var noClasses = false;
            var classOptions = '';
            if (!Array.isArray(course.class) ||
                course.class.length === 0 ||
                course.class[0] === null ||
                course.class[0] === '') {
                classOptions = "<option value=\"\" selected style=\"color:gray;\">No Classes</option>";
                noClasses = true;
            }
            else {
                classOptions = course.class
                    .map(function (cls) { return "<option>".concat(cls, "</option>"); })
                    .join('');
            }
            card.innerHTML += "\n        <div class=\"course-content\">\n          <img src=\"".concat(course.image, "\" alt=\"").concat(course.title, "\">\n          <div class=\"course-info\">\n            <div class=\"course-title\">\n              <h3>").concat(course.title, "</h3>\n              <img src=\"").concat(course.favourite === true ? "assets/icons/favourite.svg" : "assets/icons/not favourite.svg", "\" alt=\"\">\n            </div>\n            <div class=\"course-meta\">\n              <span>").concat((_a = course.subject) !== null && _a !== void 0 ? _a : "", " <span class=\"divider\">|</span> ").concat((_b = course.grade) !== null && _b !== void 0 ? _b : "", " </span>\n              <span class=\"course-grade\"> ").concat((_c = course.gradePlus) !== null && _c !== void 0 ? _c : "", "</span>\n            </div>\n            <div class=\"course-details\">\n              ").concat(course.units ? "<span><b>".concat(course.units, "</b> Units</span>") : '', "\n              ").concat(course.lessons ? "<span><b>".concat(course.lessons, "</b> Lessons</span>") : '', "\n              ").concat(course.topics ? "<span><b>".concat(course.topics, "</b> Topics</span>") : '', "\n            </div>\n            <select style=\"").concat(noClasses ? 'color:gray;' : '', "\">\n              ").concat(classOptions, "\n            </select>\n            <div class=\"class-info\">\n              ").concat(course.students ? "<span>".concat(course.students, " Students </span>") : '', "\n              ").concat(course.date ? "<span class=\"divider\">|</span><span> ".concat(course.date, "</span>") : '', "\n            </div>\n          </div>\n        </div>\n        <div style=\"height: 1px; width: 100%; background-color: #696969;\"></div>\n        <div class=\"course-action\">\n          <img src=\"assets/icons/preview.svg\" alt=\"\" style=\"opacity: ").concat(course.canPreview === false ? 0.5 : 1, "; cursor: ").concat(course.canPreview === false ? 'not-allowed' : 'pointer', ";\">\n          <img src=\"assets/icons/manage course.svg\" alt=\"\" style=\"opacity: ").concat(course.canManage === false ? 0.5 : 1, "; cursor: ").concat(course.canManage === false ? 'not-allowed' : 'pointer', ";\">\n          <img src=\"assets/icons/grade submissions.svg\" alt=\"\" style=\"opacity: ").concat(course.canGrade === false ? 0.5 : 1, "; cursor: ").concat(course.canGrade === false ? 'not-allowed' : 'pointer', ";\">\n          <img src=\"assets/icons/reports.svg\" alt=\"\" style=\"opacity: ").concat(course.canReport === false ? 0.5 : 1, "; cursor: ").concat(course.canReport === false ? 'not-allowed' : 'pointer', ";\">\n        </div>\n      ");
            grid.appendChild(card);
        });
    });
    // Announcements
    var announcementList = document.getElementById("announcement-list");
    var announcementBadge = document.querySelector('.announcement .badge');
    if (!announcementList)
        return;
    fetch("announcements.json")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        announcementList.innerHTML = "";
        data.forEach(function (item, idx) {
            var statusIcon = item.status === "read"
                ? "<img src=\"assets/icons/read.svg\" width=\"20px\" style='margin-left:auto;'\"/>"
                : "<img src=\"assets/icons/unread.svg\" width=\"20px\" style='margin-left:auto;'\"/>";
            var bgcolor = item.status === "read" ? "white" : "#FFFFEE";
            announcementList.innerHTML += "\n          <li style=\"background-color:".concat(bgcolor, ";\">\n            <div class=\"announcement-author\">\n              <span style=\"color:gray;\">PA:&nbsp;</span>").concat(item.author, "\n              ").concat(statusIcon, "\n            </div>\n            <div class=\"announcement-message\">\n              ").concat(item.message, "\n            </div>\n            ").concat(item.course ? "<div class=\"announcement-course\">Course: ".concat(item.course, "</div>") : "", "\n            <div class=\"announcement-attachment-date\">\n              ").concat(item.attachments ? "<div class=\"announcement-attachment\"><img src=\"assets/icons/paperclip.svg\" width=\"16px\"/>".concat(item.attachments, " files are attached</div>") : "", "\n              <div style=\"margin-left:auto;\">").concat(item.date, "</div>\n            </div>\n          </li>\n        ");
        });
        if (announcementBadge) {
            announcementBadge.textContent = data.length.toString();
        }
    });
    // Notifications
    var notificationList = document.getElementById("notification-list");
    var notificationBadge = document.querySelector('.notification .badge');
    if (!notificationList)
        return;
    fetch("notifications.json")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        notificationList.innerHTML = "";
        data.forEach(function (item) {
            var statusIcon = item.status === "read"
                ? "<img src=\"assets/icons/read.svg\" width=\"20px\" style='margin-left:auto;'\"/>"
                : "<img src=\"assets/icons/unread.svg\" width=\"20px\" style='margin-left:auto;'\"/>";
            var bgcolor = item.status === "read" ? "white" : "#FFFFEE";
            notificationList.innerHTML += "\n            <li style=\"background-color:".concat(bgcolor, ";\">\n              <div class=\"notification-title\">\n                ").concat(item.title || "", "\n                ").concat(statusIcon, "\n              </div>\n              <div class=\"notification-metadata\">\n                ").concat(item.course ? "<div><span style=\"color:#6E6E6E;\">Course:</span> ".concat(item.course, "</div>") : "", "\n                ").concat(item.class ? "<div><span style=\"color:#6E6E6E;\">Class:</span> ".concat(item.class, "</div>") : "", "\n                <div class=\"notification-date\">").concat(item.date || "", "</div>\n              </div>\n            </li>\n          ");
        });
        if (notificationBadge) {
            notificationBadge.textContent = data.length.toString();
        }
    });
});
