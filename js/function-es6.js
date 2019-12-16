function deleteRes(dialogInfo) {
    const id = dialogInfo.id;
    const index = dialogInfo.index;
    let agents = JSON.parse(sessionStorage.getItem("agents"));
    // 根据索引删除数组中的元素
    agents[id].resources[index] =
        agents[id].resources[agents[id].resources.length - 1];
    agents[id].resources.length -= 1;
    updataData(agents);
}
function addRes(dialogInfo) {
    const id = dialogInfo.id;
    const inputValue = document.querySelector(`.res${id}`).value;
    const res = inputValue
        .split(",")
        .map(function(e) {
            // 清楚内容前后空格
            return e.trim();
        })
        .filter(function(e) {
            return e.length > 0;
        }); //过滤空字符串

    let agents = JSON.parse(sessionStorage.getItem("agents"));
    agents[id].resources = agents[id].resources
        .concat(res)
        .filter(function(e, i, arr) {
            return arr.indexOf(e) == i;
        });
    updataData(agents);
}

function openDialog(dialogInfo) {
    const id = dialogInfo.id;
    // 展示弹出框
    let dialog = document.querySelector(`.dialog${id}`);
    let masklayer = document.querySelector(`.mask${id}`);
    dialog.style.visibility = "visible";
    masklayer.style.visibility = "visible";
    // console.log("event", window.event);
}

function closeDialog(dialogInfo) {
    let id = dialogInfo.id;
    let dialog = document.querySelector(`.dialog${id}`);
    let masklayer = document.querySelector(`.mask${id}`);
    dialog.style.visibility = "hidden";
    masklayer.style.visibility = "hidden";
    // 清除输入框内容
    document.querySelector(`.res${id}`).value = "";
}

let getTaskDetailByData = function(serverItem, index) {
    let resourcesString = "";
    serverItem.resources.map(function(e, i) {
        resourcesString += `<span>${e} <i class="icon-trash" onclick="deleteRes({id: ${index}, index: ${i} })"></i></span>`;
    });
    if (serverItem.status == "building") {
        resourcesString += `<div class="build-deny">
            <i class="icon-deny"></i>
            <label class="text-deny">Deny</label>
        </div>`;
    }
    resourcesString += `
        <div class="dialog dialog${index}">
            <i class="icon-close" onclick="closeDialog({id:${index}})"></i>
            <div class="dialog-title">Separate multiply resource name with commas</div>
            <input type="text" placeholder="  Input value" class="res-input res${index}">
            <div class="btn-group">
                <span class="btn-add" onclick="addRes({id:${index}})">Add Resources</span>
                <span class="btn-cancel" onclick="closeDialog({id:${index}})">Cancel</span>
            </div>
            <div class="triangle"></div>
        </div>
        <div class="mask mask${index}" onclick="closeDialog({id:${index}})"></div>
    `;
    return `<div class="task-detail">
    <div class="os-icon">
        <img
            src="./ASSETS/os icons/${serverItem.os || "windows"}.png"
            alt="${serverItem.os || "windows"}"
        />
    </div>
    <div class="agent-info">
        <div class="server-tags">
            <span class="server-name">
                <i class="icon-desktop"></i>
                <span
                    >${serverItem.name}</span
                >
            </span>
            <span class="badges-status ${serverItem.status}"
                >${serverItem.status}</span
            >
            <span class="server-ip">
                <i class="icon-info"></i>
                <span>${serverItem.ip}</span>
            </span>
            <span class="server-folder">
                <i class="icon-folder"></i>
                <span>${serverItem.location}</span>
            </span>
        </div>
        <div class="res-tags">
            <i class="icon-plus" onclick="openDialog({id: ${index}})"></i>
            ${resourcesString}
        </div>
    </div>
</div>`;
};

let getCardInfoByData = function(server) {
    console.log("server", server);
    let stringTampleat = `<div class="card-info">
        <div class="building">
            <div class="status">building</div>
            <div class="number">3</div>
            <i class="icon-cog"></i>
        </div>
        <div class="idle">
            <div class="status">idle</div>
            <div class="number">5</div>
            <i class="icon-coffee"></i>
        </div>
        <div class="summary">
            <ul>
                <li>
                    <div>All</div>
                    <span>8</span>
                </li>
                <li>
                    <div>PHYSICAL</div>
                    <span>4</span>
                </li>
                <li>
                    <div>VIRTUAL</div>
                    <span>4</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="filter-tools">
        <span class="type-button actived">All</span>
        <span class="type-button">Physical</span>
        <span class="type-button">Virtual</span>
        <div class="search-tools">
            <i class="icon-search"></i>
            <input type="text" class="search-input" />
        </div>
        <i class="icon-th-card"></i>
        <i class="icon-th-list activedIcon"></i>
    </div>`;
    return stringTampleat;
};
let cachesData;
try {
    cachesData =
        sessionStorage.getItem("agents") &&
        JSON.parse(sessionStorage.getItem("agents"));
} catch (e) {
    console.log("e", e);
    cachesData = null;
}

let data = cachesData || [
    {
        name: "bjstdmngbdr08.thoughtworks.com",
        os: "windows",
        status: "building",
        type: "virtual",
        ip: "192.168.1.80",
        location: "/var/lib/cruise-agent",
        resources: ["Firefox", "Safari", "Ubuntu", "Chrome"],
        id: 1
    },
    {
        name: "bjstdmngbdr08.thoughtworks.com",
        os: "windows",
        status: "building",
        type: "virtual",
        ip: "192.168.1.80",
        location: "/var/lib/cruise-agent",
        resources: ["Firefox", "Safari", "Ubuntu", "Chrome"],
        id: 2
    },
    {
        name: "bjstdmngbdr10.thoughtworks.com",
        os: "ubuntu",
        status: "building",
        type: "physical",
        ip: "192.168.1.117",
        location: "/var/lib/cruise-agent",
        resources: ["Firefox", "Safari"],
        id: 3
    },
    {
        name: "bjstdmngbdr11.thoughtworks.com",
        os: "debian",
        status: "building",
        type: "virtual",
        ip: "192.168.1.102",
        location: "/var/lib/cruise-agent",
        resources: ["Firefox", "Safari", "Ubuntu", "Chrome"],
        id: 4
    },
    {
        name: "bjstdmngbdr15.thoughtworks.com",
        os: "suse",
        status: "idle",
        type: "physical",
        ip: "192.168.1.110",
        location: "/var/lib/cruise-agent",
        resources: [],
        id: 5
    },
    {
        name: "bjstdmngbdr02.thoughtworks.com",
        os: "centos",
        status: "idle",
        type: "virtual",
        ip: "192.168.1.103",
        location: "/var/lib/cruise-agent",
        resources: ["Firefox", "Safari", "Ubuntu", "Chrome"],
        id: 6
    },
    {
        name: "bjstdmngbdr04.thoughtworks.com",
        os: "suse",
        status: "idle",
        type: "physical",
        ip: "192.168.1.113",
        location: "/var/lib/cruise-agent",
        resources: ["Firefox", "Safari", "Ubuntu", "Chrome"],
        id: 7
    },
    {
        name: "bjstdmngbdr22.thoughtworks.com",
        os: "centos",
        status: "idle",
        type: "virtual",
        ip: "192.168.1.111",
        location: "/var/lib/cruise-agent",
        resources: ["Ubuntu", "Chrome"],
        id: 8
    },
    {
        name: "bjstdmngbdr08.thoughtworks.com",
        os: "windows",
        status: "building",
        type: "virtual",
        ip: "192.168.1.80",
        location: "/var/lib/cruise-agent",
        resources: ["Firefox", "Safari", "Ubuntu", "Chrome"],
        id: 10
    },
    {
        name: "bjstdmngbdr08.thoughtworks.com",
        os: "windows",
        status: "building",
        type: "virtual",
        ip: "192.168.1.80",
        location: "/var/lib/cruise-agent",
        resources: ["Firefox", "Safari", "Ubuntu", "Chrome"],
        id: 11
    },
    {
        name: "bjstdmngbdr08.thoughtworks.com",
        os: "windows",
        status: "building",
        type: "virtual",
        ip: "192.168.1.80",
        location: "/var/lib/cruise-agent",
        resources: ["Firefox", "Safari", "Ubuntu", "Chrome"],
        id: 12
    }
];

function updataData(agents) {
    let panelContentInnerHtml = "";
    panelContentInnerHtml += getCardInfoByData(agents);
    agents.map(function(agent, index) {
        panelContentInnerHtml += getTaskDetailByData(agent, index);
    });
    let panelContent = document.querySelector(".panel-content");
    panelContent.innerHTML = panelContentInnerHtml;
    sessionStorage.setItem("agents", JSON.stringify(agents));
}

updataData(data);
