"use client";

import { useEffect, useState } from "react";
import "./regformcss.css";
import Image from "next/image";
import Link from "next/link";
import aiimg from "./ai3.png";
import AlertComponent from "./AlertComponent";
import { db } from "@/backend/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const rollRegex = /^25[A-Z]{2}\d{5,6}$/;

const RegForm = () => {
  const [nme, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [hallOfResidence, setHallOfResidence] = useState("");
  const [otherInvolvements, setOtherInvolvements] = useState("");
  const [joinReason, setJoinReason] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [selTeams, setSelTeams] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertTitle, setAlertTitle] = useState("Error registering for selections");
  const [alertType, setAlertType] = useState("warning");
  const [alertShown, setAlertShown] = useState(false);

  const teamOptions = [
    { value: "AI and Metaverse Team", label: "AI and Metaverse Team" },
    { value: "Blockchain Team", label: "Blockchain Team" },
    { value: "Tech Team", label: "Tech Team" },
    { value: "Design and Media Team", label: "Design and Media Team" },
    { value: "Events Team", label: "Events Team" },
  ];

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (alertShown) {
      const timer = setTimeout(() => setAlertShown(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [alertShown]);

  const handleRollChange = (e) => {
    setRollNumber(e.target.value);
  };

  const showAlert = (message, type = "warning", title = "Error registering for selections") => {
    setAlertMsg(message);
    setAlertType(type);
    setAlertTitle(title);
    setAlertShown(false);
    setTimeout(() => setAlertShown(true), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoad(true);

    const trimmedRoll = rollNumber.trim().toUpperCase();

    if (!rollRegex.test(trimmedRoll)) {
      showAlert("Roll number invalid");
      setIsLoad(false);
      return;
    }

    if (selTeams.length === 0 || selTeams.length > 2) {
      showAlert("Please select at least one team and at most two teams");
      setIsLoad(false);
      return;
    }

    if (
      nme.trim() === "" ||
      email.trim() === "" ||
      mobileNumber.trim() === "" ||
      hallOfResidence.trim() === "" ||
      otherInvolvements.trim() === ""
    ) {
      showAlert("Please fill all required fields");
      setIsLoad(false);
      return;
    }

    try {
      const dupSnap = await getDocs(
        query(
          collection(db, "registrations"),
          where("rollNumber", "==", trimmedRoll)
        )
      );
      if (!dupSnap.empty) {
        showAlert("You are already registered!", "warning", "Already Registered");
        setIsLoad(false);
        return;
      }

      await addDoc(collection(db, "registrations"), {
        name: nme.trim(),
        email: email.trim(),
        rollNumber: trimmedRoll,
        mobileNumber: mobileNumber.trim(),
        hallOfResidence: hallOfResidence.trim(),
        teamsApplyingFor: selTeams,
        otherInvolvements: otherInvolvements.trim(),
        joinReason: joinReason.trim(),
        timestamp: new Date(),
      });

      showAlert(
        "Thank you for participating in selection",
        "success",
        "Successfully registered for selections"
      );
      setName("");
      setRollNumber("");
      setEmail("");
      setMobileNumber("");
      setHallOfResidence("");
      setOtherInvolvements("");
      setJoinReason("");
      setSelTeams([]);
    } catch (error) {
      showAlert("Error registering: " + error.message);
    }

    setIsLoad(false);
  };

  const handleTeamChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (selTeams.length >= 2) {
        showAlert("You can select at most 2 teams");
        return;
      }
      setSelTeams((prev) => [...prev, value]);
      return;
    }

    setSelTeams((prev) => prev.filter((team) => team !== value));
  };

  return (
    <>
      <div className="regpage">
        <div className="imgofai">
          <Image src={aiimg} alt="AI" className="aiimgreg" />
        </div>
        <div className="regbox">
          <h5 className="reg-header">Registration Form</h5>
          <form onSubmit={handleSubmit} className="regformtag" id="registration-form">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input_box border border-blue-300"
              placeholder="Email"
              required
            />
            <input
              type="text"
              id="name"
              value={nme}
              onChange={(e) => setName(e.target.value)}
              className="input_box border border-blue-300"
              placeholder="Name"
              required
            />
            <input
              type="text"
              id="roll-number"
              value={rollNumber}
              onChange={handleRollChange}
              className="input_box border border-blue-300"
              placeholder="Roll Number"
              required
            />
            <input
              type="tel"
              id="mobile-number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="input_box border border-blue-300"
              placeholder="Mobile Number"
              required
            />
            <input
              type="text"
              id="hall-of-residence"
              value={hallOfResidence}
              onChange={(e) => setHallOfResidence(e.target.value)}
              className="input_box border border-blue-300"
              placeholder="Hall of Residence"
              required
            />
            <div
              style={{
                color: "white",
                fontSize: "2.2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginTop: "0.3rem",
                marginBottom: "0.2rem",
              }}
            >
              <span>Check out our Tasks </span>
              <Link
                href="https://drive.google.com/drive/folders/1PwlTkzcoRiNkAeRghsGxpvJojqtypmWB"
                style={{
                  color: "black",
                  background:
                    "linear-gradient(to right, rgb(17, 227, 251), rgb(91, 230, 255), rgb(181, 246, 253), rgb(17, 227, 251))",
                  padding: "4px 12px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontSize: "1.9vh",
                  fontWeight: "bold",
                  transition: "all 0.4s ease",
                  boxShadow: "0 4px 14px rgba(17, 227, 251, 0.5)",
                  backgroundClip: "padding-box",
                  WebkitBackgroundClip: "padding-box",
                }}
                target="_blank"
              >
                here
              </Link>
            </div>
            <div className="sel-team-main-div">
              <label className="select-team-text">
                Teams applying for (Select at most 2): *
              </label>
              <div className="team-checkbox-container">
                {teamOptions.map((option) => (
                  <div key={option.value} className="team-checkbox-item">
                    <input
                      type="checkbox"
                      id={`team-${option.value}`}
                      value={option.value}
                      checked={selTeams.includes(option.value)}
                      onChange={handleTeamChange}
                    />
                    <label htmlFor={`team-${option.value}`}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {selTeams.length === 0 && (
                <p className="error-message">Please select at least one team</p>
              )}
            </div>
            <input
              type="text"
              id="other-involvements"
              value={otherInvolvements}
              onChange={(e) => setOtherInvolvements(e.target.value)}
              className="input_box border border-blue-300"
              placeholder="What are your other involvements in the campus?"
              required
            />
            <input
              type="text"
              id="join-reason"
              value={joinReason}
              onChange={(e) => setJoinReason(e.target.value)}
              className="input_box border border-blue-300"
              placeholder="Why do you want to join society?"
              required
            />
          </form>
          <div className="submit">
            <button
              type="submit"
              form="registration-form"
              className="reg-btn"
              disabled={isLoad}
            >
              {isLoad && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                </svg>
              )}
              {!isLoad && <div>Register</div>}
            </button>
          </div>
        </div>
        {alertShown && (
          <div className="reg-alert-wrap">
            <AlertComponent type={alertType} title={alertTitle} message={alertMsg} />
          </div>
        )}
      </div>
    </>
  );
};

export default RegForm;
