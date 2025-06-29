interface Course {
  expired?: boolean;
  image: string;
  title: string;
  favourite?: boolean;
  subject?: string;
  grade?: string;
  gradePlus?: string;
  units?: number;
  lessons?: number;
  topics?: number;
  class?: (string | null)[];
  students?: number;
  date?: string;
  canPreview?: boolean;
  canManage?: boolean;
  canGrade?: boolean;
  canReport?: boolean;
}

interface Announcement {
  status: "read" | "unread";
  author: string;
  message: string;
  course?: string;
  attachments?: number;
  date: string;
}

interface MyNotification {
  status: "read" | "unread";
  title: string;
  course?: string;
  class?: string;
  date?: string;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('courses.json')
    .then(response => response.json())
    .then((courses: Course[]) => {
      const grid = document.getElementById('coursesGrid');
      if (!grid) return;
      grid.innerHTML = '';
      courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        if (course.expired) {
          card.innerHTML += `<span class="expired">EXPIRED</span>`;
        }

        // Handle class array for select options
        let noClasses = false;
        let classOptions = '';
        if (
          !Array.isArray(course.class) ||
          course.class.length === 0 ||
          course.class[0] === null ||
          course.class[0] === ''
        ) {
          classOptions = `<option value="" selected style="color:gray;">No Classes</option>`;
          noClasses = true;
        } else {
          classOptions = course.class
            .map(cls => `<option>${cls}</option>`)
            .join('');
        }

        card.innerHTML += `
        <div class="course-content">
          <img src="${course.image}" alt="${course.title}">
          <div class="course-info">
            <div class="course-title">
              <h3>${course.title}</h3>
              <img src="${course.favourite === true ? "assets/icons/favourite.svg" : "assets/icons/not favourite.svg"}" alt="">
            </div>
            <div class="course-meta">
              <span>${course.subject ?? ""} <span class="divider">|</span> ${course.grade ?? ""} </span>
              <span class="course-grade"> ${course.gradePlus ?? ""}</span>
            </div>
            <div class="course-details">
              ${course.units ? `<span><b>${course.units}</b> Units</span>` : ''}
              ${course.lessons ? `<span><b>${course.lessons}</b> Lessons</span>` : ''}
              ${course.topics ? `<span><b>${course.topics}</b> Topics</span>` : ''}
            </div>
            <select style="${noClasses ? 'color:gray;' : ''}">
              ${classOptions}
            </select>
            <div class="class-info">
              ${course.students ? `<span>${course.students} Students </span>` : ''}
              ${course.date ? `<span class="divider">|</span><span> ${course.date}</span>` : ''}
            </div>
          </div>
        </div>
        <div style="height: 1px; width: 100%; background-color: #696969;"></div>
        <div class="course-action">
          <img src="assets/icons/preview.svg" alt="" style="opacity: ${course.canPreview === false ? 0.5 : 1}; cursor: ${course.canPreview === false ? 'not-allowed' : 'pointer'};">
          <img src="assets/icons/manage course.svg" alt="" style="opacity: ${course.canManage === false ? 0.5 : 1}; cursor: ${course.canManage === false ? 'not-allowed' : 'pointer'};">
          <img src="assets/icons/grade submissions.svg" alt="" style="opacity: ${course.canGrade === false ? 0.5 : 1}; cursor: ${course.canGrade === false ? 'not-allowed' : 'pointer'};">
          <img src="assets/icons/reports.svg" alt="" style="opacity: ${course.canReport === false ? 0.5 : 1}; cursor: ${course.canReport === false ? 'not-allowed' : 'pointer'};">
        </div>
      `;
        grid.appendChild(card);
      });
    });

  // Announcements
  const announcementList = document.getElementById("announcement-list");
  const announcementBadge = document.querySelector('.announcement .badge') as HTMLElement | null;
  if (!announcementList) return;

  fetch("announcements.json")
    .then(res => res.json())
    .then((data: Announcement[]) => {
      announcementList.innerHTML = "";
      data.forEach((item, idx) => {
        const statusIcon = item.status === "read"
          ? `<img src="assets/icons/read.svg" width="20px" style='margin-left:auto;'"/>`
          : `<img src="assets/icons/unread.svg" width="20px" style='margin-left:auto;'"/>`;
        const bgcolor = item.status === "read" ? "white" : "#FFFFEE";
        announcementList.innerHTML += `
          <li style="background-color:${bgcolor};">
            <div class="announcement-author">
              <span style="color:gray;">PA:&nbsp;</span>${item.author}
              ${statusIcon}
            </div>
            <div class="announcement-message">
              ${item.message}
            </div>
            ${item.course ? `<div class="announcement-course">Course: ${item.course}</div>` : ""}
            <div class="announcement-attachment-date">
              ${item.attachments ? `<div class="announcement-attachment"><img src="assets/icons/paperclip.svg" width="16px"/>${item.attachments} files are attached</div>` : ""}
              <div style="margin-left:auto;">${item.date}</div>
            </div>
          </li>
        `;
      });

      if (announcementBadge) {
        announcementBadge.textContent = data.length.toString();
      }
    });

  // Notifications
  const notificationList = document.getElementById("notification-list");
  const notificationBadge = document.querySelector('.notification .badge') as HTMLElement | null;
  if (!notificationList) return;

  fetch("notifications.json")
    .then(res => res.json())
    .then((data: MyNotification[]) => {
      notificationList.innerHTML = "";
      data.forEach(item => {
        const statusIcon =
          item.status === "read"
            ? `<img src="assets/icons/read.svg" width="20px" style='margin-left:auto;'"/>`
            : `<img src="assets/icons/unread.svg" width="20px" style='margin-left:auto;'"/>`;
        const bgcolor = item.status === "read" ? "white" : "#FFFFEE";
        notificationList.innerHTML += `
            <li style="background-color:${bgcolor};">
              <div class="notification-title">
                ${item.title || ""}
                ${statusIcon}
              </div>
              <div class="notification-metadata">
                ${item.course ? `<div><span style="color:#6E6E6E;">Course:</span> ${item.course}</div>` : ""}
                ${item.class ? `<div><span style="color:#6E6E6E;">Class:</span> ${item.class}</div>` : ""}
                <div class="notification-date">${item.date || ""}</div>
              </div>
            </li>
          `;
      });

      if (notificationBadge) {
        notificationBadge.textContent = data.length.toString();
      }
    });

  // Active on click
  const navLinks = document.querySelectorAll('.nav-items a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  const stats = document.querySelectorAll('.stats-banner .stat');
  stats.forEach(stat => {
    stat.addEventListener('click', function () {
      stats.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
    });
  });
});