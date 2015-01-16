define({ "api": [
  {
    "type": "get",
    "url": "/config",
    "title": "Get Engine configuration",
    "group": "Config",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "engine",
            "description": "<p>Key-value map of all engine settings</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "driver",
            "description": "<p>Key-value map of all G2 driver settings</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "opensbp",
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
    "version": "0.0.0",
    "filename": "routes/config.js",
    "groupTitle": "Config",
    "name": "PostConfig"
  },
  {
    "type": "get",
    "url": "/apps",
    "title": "List of apps",
    "group": "Dashboard",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "apps",
            "description": "<p>List of app objects</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.name",
            "description": "<p>Human-readable app name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.app_url",
            "description": "<p>Root URL for the app</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.app_path",
            "description": "<p>App path (Used internally by the engine)</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.icon_path",
            "description": "<p>URL of app icon</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.icon_background_color",
            "description": "<p>CSS color value of the app icon</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.id",
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
            "type": "Object[]",
            "optional": false,
            "field": "apps",
            "description": "<p>List of app objects</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.name",
            "description": "<p>Human-readable app name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.app_url",
            "description": "<p>Root URL for the app</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.app_path",
            "description": "<p>App path (Used internally by the engine)</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.icon_path",
            "description": "<p>URL of app icon</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.icon_background_color",
            "description": "<p>CSS color value of the app icon</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.id",
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
    "group": "Jobs",
    "type": "delete",
    "url": "/jobs/:id",
    "title": "Cancel job",
    "description": "<p>Cancel a pending job</p> ",
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
            "type": "Object[]",
            "optional": false,
            "field": "jobs",
            "description": "<p>List of all jobs</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "jobs._id",
            "description": "<p>Unique job ID</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jobs.state",
            "description": "<p><code>pending</code> | <code>running</code> | <code>finished</code> | <code>cancelled</code></p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jobs.name",
            "description": "<p>Human readable job name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jobs.description",
            "description": "<p>Job description</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "jobs.created_at",
            "description": "<p>Time job was added to the queue (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "jobs.started_at",
            "description": "<p>Time job was started (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "jobs.finished_at",
            "description": "<p>Time job was finished (UNIX timestamp)</p> "
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
    "description": "<p>Get information about a specific job</p> ",
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
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique job ID</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p><code>pending</code> | <code>running</code> | <code>finished</code> | <code>cancelled</code></p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable job name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Job description</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "created_at",
            "description": "<p>Time job was added to the queue (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "started_at",
            "description": "<p>Time job was started (UNIX timestamp)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "finished_at",
            "description": "<p>Time job was finished (UNIX timestamp)</p> "
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
    "description": "<p>Get all the pending jobs currently in the queue</p> ",
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "GetJobsQueue"
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
    "version": "0.0.0",
    "filename": "routes/jobs.js",
    "groupTitle": "Jobs",
    "name": "PostJobsQueueRun"
  },
  {
    "type": "get",
    "url": "/status",
    "title": "Engine status",
    "group": "Status",
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{ \"status\":{\"posx\":0.0, \"posy\":0.0, \"posz\":0.0, \"state\":\"idle\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/config.js",
    "groupTitle": "Status",
    "name": "GetStatus"
  }
] });