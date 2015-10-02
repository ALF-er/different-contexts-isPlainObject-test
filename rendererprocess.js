const remote = require("remote");

remote.getGlobal("store").dispatch({ type: "ACTION_FROM_ANOTHER_GLOBAL_CONTEXT" });
