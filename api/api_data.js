define({ "api": [
  {
    "type": "get",
    "url": "/config",
    "title": "Get Engine configuration",
    "group": "Config",
    "description": "<p>Dictionary</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.engine",
            "description": "<p>Key-value map of all engine settings</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.driver",
            "description": "<p>Key-value map of all G2 driver settings</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.opensbp",
            "description": "<p>Key-value map of all OpenSBP runtime settings</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/config.js",
    "groupTitle": "Config",
    "name": "GetConfig"
  },
  {
    "type": "post",
    "url": "/config",
    "title": "Update engine configuration",
    "group": "Config",
    "description": "<p>Incorporate the POSTed object into the engine configuration.  Configuration updates take effect immediately.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "engine",
            "description": "<p>Key-value map of updates to engine settings</p> "
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "driver",
            "description": "<p>Key-value map of updates to G2 driver settings</p> "
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "opensbp",
            "description": "<p>Key-value map of updates to OpenSBP settings</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/config.js",
    "groupTitle": "Config",
    "name": "PostConfig"
  },
  {
    "type": "delete",
    "url": "/apps/:id",
    "title": "App",
    "description": "<p>Delete the specified app</p> ",
    "group": "Dashboard",
    "version": "0.0.0",
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard",
    "name": "DeleteAppsId"
  },
  {
    "type": "get",
    "url": "/apps",
    "title": "List of apps",
    "group": "Dashboard",
    "description": "<p>Get detailed information about all installed apps</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data</p> "
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.apps",
            "description": "<p>List of app objects</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.apps.name",
            "description": "<p>Human-readable app name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.apps.app_url",
            "description": "<p>Root URL for the app</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.apps.app_path",
            "description": "<p>App path (Used internally by the engine)</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.apps.icon_path",
            "description": "<p>URL of app icon</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.apps.icon_background_color",
            "description": "<p>CSS color value of the app icon</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.apps.id",
            "description": "<p>Unique ID of this app (used in app URLs)</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard",
    "name": "GetApps"
  },
  {
    "type": "get",
    "url": "/apps/:id",
    "title": "App info",
    "group": "Dashboard",
    "description": "<p>Get detailed information about the specified app</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of requested app</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.app",
            "description": "<p>App object</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.app.name",
            "description": "<p>Human-readable app name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.app.app_url",
            "description": "<p>Root URL for the app</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.app.app_path",
            "description": "<p>App path (Used internally by the engine)</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.app.icon_path",
            "description": "<p>URL of app icon</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.app.icon_background_color",
            "description": "<p>CSS color value of the app icon</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.app.id",
            "description": "<p>Unique ID of this app (used in app URLs)</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard",
    "name": "GetAppsId"
  },
  {
    "type": "get",
    "url": "/apps/:id/files",
    "title": "Get app file listing",
    "group": "Dashboard",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of requested app</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "root",
            "description": "<p>Root of directory tree</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard",
    "name": "GetAppsIdFiles"
  },
  {
    "group": "Dashboard",
    "type": "post",
    "url": "/app",
    "title": "Submit an app to be installed",
    "description": "<p>Install an app to the user&#39;s app installation directory.  App will be decompressed and installed immediately.</p> ",
    "version": "0.0.0",
    "filename": "routes/dashboard.js",
    "groupTitle": "Dashboard",
    "name": "PostApp"
  },
  {
    "type": "get",
    "url": "/restart",
    "title": "Kill the engine",
    "description": "<p>Forcibly terminate the engine software.  Software may be restarted by system service manager</p> ",
    "group": "Developer",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>success</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/kill.js",
    "groupTitle": "Developer",
    "name": "GetRestart"
  },
  {
    "type": "post",
    "url": "/direct/fixed_move",
    "title": "Move a fixed distance",
    "group": "Direct",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "move",
            "description": "<p>One of the following direction strings (&quot;x&quot;, &quot;-x&quot; , &quot;y&quot; , &quot;-y&quot; , &quot;z&quot; , &quot;-z&quot; , etc.) or &quot;stop&quot; to stop moving.</p> "
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "step",
            "description": "<p>Increment to move in the specified direction</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>success</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>error</p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/direct.js",
    "groupTitle": "Direct",
    "name": "PostDirectFixed_move"
  },
  {
    "type": "post",
    "url": "/direct/gcode",
    "title": "Execute G-code string",
    "group": "Direct",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cmd",
            "description": "<p>A single G-code block to execute</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>success</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>error</p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/direct.js",
    "groupTitle": "Direct",
    "name": "PostDirectGcode"
  },
  {
    "type": "post",
    "url": "/direct/goto",
    "title": "Move to a fixed position",
    "group": "Direct",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "x",
            "description": "<p>X position</p> "
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "y",
            "description": "<p>Y position</p> "
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "z",
            "description": "<p>Z position</p> "
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "a",
            "description": "<p>A position</p> "
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "b",
            "description": "<p>B position</p> "
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "c",
            "description": "<p>C position</p> "
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "f",
            "description": "<p>Feedrate (in current system units)</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>success</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>error</p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/direct.js",
    "groupTitle": "Direct",
    "name": "PostDirectGoto"
  },
  {
    "type": "post",
    "url": "/direct/sbp",
    "title": "Execute OpenSBP code string",
    "group": "Direct",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cmd",
            "description": "<p>A single line of OpenSBP code to execute</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>success</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>error</p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/direct.js",
    "groupTitle": "Direct",
    "name": "PostDirectSbp"
  },
  {
    "group": "Jobs",
    "type": "delete",
    "url": "/jobs/:id",
    "title": "Cancel job",
    "description": "<p>Cancel a pending job.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of job to cancel</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "DeleteJobsId"
  },
  {
    "type": "delete",
    "url": "/jobs/queue",
    "title": "Clear job queue",
    "group": "Jobs",
    "description": "<p>Empty the job queue of all pending jobs.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "DeleteJobsQueue"
  },
  {
    "group": "Jobs",
    "type": "get",
    "url": "/jobs",
    "title": "List all jobs",
    "description": "<p>Get a list of all jobs, including those that are pending, currently running, and finished.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data</p> "
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.jobs",
            "description": "<p>List of all jobs</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.jobs._id",
            "description": "<p>Unique job ID</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.jobs.state",
            "description": "<p><code>pending</code> | <code>running</code> | <code>finished</code> | <code>cancelled</code></p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.jobs.name",
            "description": "<p>Human readable job name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.jobs.description",
            "description": "<p>Job description</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.jobs.created_at",
            "description": "<p>Time job was added to the queue (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.jobs.started_at",
            "description": "<p>Time job was started (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.jobs.finished_at",
            "description": "<p>Time job was finished (UNIX timestamp)</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "GetJobs"
  },
  {
    "group": "Jobs",
    "type": "get",
    "url": "/jobs/:id",
    "title": "Job info",
    "description": "<p>Get detailed information about a specific job.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of requested job</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.job",
            "description": "<p>Requested job</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.job._id",
            "description": "<p>Unique job ID</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.job.state",
            "description": "<p><code>pending</code> | <code>running</code> | <code>finished</code> | <code>cancelled</code></p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.job.name",
            "description": "<p>Human readable job name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.job.description",
            "description": "<p>Job description</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.job.created_at",
            "description": "<p>Time job was added to the queue (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.job.started_at",
            "description": "<p>Time job was started (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.job.finished_at",
            "description": "<p>Time job was finished (UNIX timestamp)</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "GetJobsId"
  },
  {
    "group": "Jobs",
    "type": "get",
    "url": "/jobs/queue",
    "title": "Job queue",
    "description": "<p>Get a list of all the pending jobs currently in the queue.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data</p> "
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.jobs",
            "description": "<p>List of all jobs</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.jobs._id",
            "description": "<p>Unique job ID</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.jobs.state",
            "description": "<p><code>pending</code> | <code>running</code> | <code>finished</code> | <code>cancelled</code></p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.jobs.name",
            "description": "<p>Human readable job name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.jobs.description",
            "description": "<p>Job description</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.jobs.created_at",
            "description": "<p>Time job was added to the queue (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.jobs.started_at",
            "description": "<p>Time job was started (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.jobs.finished_at",
            "description": "<p>Time job was finished (UNIX timestamp)</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "GetJobsQueue"
  },
  {
    "group": "Jobs",
    "type": "post",
    "url": "/job",
    "title": "Submit a job",
    "description": "<p>Add a job to the job queue.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Job name</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Job description</p> "
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "file",
            "description": "<p>G-Code or OpenSBP file submission</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "PostJob"
  },
  {
    "group": "Jobs",
    "type": "post",
    "url": "/jobs/:id",
    "title": "Resubmit job",
    "description": "<p>Submit a new job identical to the one specified.  Used to re-run completed jobs without modification.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of job to resubmit</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "PostJobsId"
  },
  {
    "group": "Jobs",
    "type": "post",
    "url": "/jobs/queue/run",
    "title": "Run next job in queue",
    "description": "<p>Runs the next job in the queue if able.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "PostJobsQueueRun"
  },
  {
    "group": "Macros",
    "type": "post",
    "url": "/macro",
    "title": "Submit a macro",
    "description": "<p>Add a macro</p> ",
    "version": "0.0.0",
    "filename": "routes/macros.js",
    "groupTitle": "Macros",
    "name": "PostMacro"
  },
  {
    "type": "get",
    "url": "/pause",
    "title": "Pause",
    "description": "<p>Pause the current job. Only a valid operation when a job is running. Generally, a resume is possible after this operation.</p> ",
    "group": "State",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/state.js",
    "groupTitle": "State",
    "name": "GetPause"
  },
  {
    "type": "get",
    "url": "/quit",
    "title": "Quit",
    "group": "State",
    "description": "<p>Abort the current job, whether it is running, paused, or stopped due to an error.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/state.js",
    "groupTitle": "State",
    "name": "GetQuit"
  },
  {
    "type": "get",
    "url": "/resume",
    "title": "Resume",
    "group": "State",
    "description": "<p>Continue running the current job if the system is paused.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>null</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>error</code></p> "
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/state.js",
    "groupTitle": "State",
    "name": "GetResume"
  },
  {
    "type": "get",
    "url": "/status",
    "title": "Engine status",
    "group": "Status",
    "description": "<p>Get a system status report, which includes tool position, IO states, current job, progress, etc.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p><code>success</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.status",
            "description": "<p>Status info</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status.state",
            "description": "<p><code>idle</code> | <code>running</code> | <code>paused</code> | <code>stopped</code></p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status.posx",
            "description": "<p>X Position</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status.posy",
            "description": "<p>Y Position</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status.posz",
            "description": "<p>Z Position</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status.posa",
            "description": "<p>A Position</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status.posb",
            "description": "<p>B Position</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status.posc",
            "description": "<p>C Position</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.status.job",
            "description": "<p>Current Job | <code>null</code></p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status.job.state",
            "description": "<p><code>pending</code> | <code>running</code> | <code>finished</code> | <code>cancelled</code></p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status.job.name",
            "description": "<p>Human readable job name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status.job.description",
            "description": "<p>Job description</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status.job.created_at",
            "description": "<p>Time job was added to the queue (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status.job.started_at",
            "description": "<p>Time job was started (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status.job.finished_at",
            "description": "<p>Time job was finished (UNIX timestamp)</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/config.js",
    "groupTitle": "Status",
    "name": "GetStatus"
  }
] });