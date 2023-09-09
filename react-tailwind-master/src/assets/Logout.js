import { useEffect } from "react";
import axios from "axios";

export default function Logout() {
  useEffect(() => {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/logout",
      params: {
        id:
          "userid" in localStorage
            ? JSON.parse(localStorage.getItem("userid"))
            : undefined,
        accessToken: JSON.parse(localStorage.getItem("token")).token,
      },
    };

    axios(config).then(function (response) {
      if (response) {
        var redirectTo =
          "redirectTo" in localStorage
            ? JSON.parse(localStorage.getItem("redirectTo")) ===
              "xGpAQhWobyTxIPx51LAKKOGnrWZNUtcOImuVUIPdqc="
              ? "/"
              : JSON.parse(localStorage.getItem("redirectTo"))
            : "/";

        localStorage.clear();
        window.location = redirectTo;
      }
    });
  });
}
