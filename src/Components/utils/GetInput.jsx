"use client";
function GetInput({ testcaseUrl }) {
  const openTestCaseTab = (testcaseUrl) => {
    if (!testcaseUrl) {
      alert("Test case can't be opened: Try again");
      return;
    }

    // Ensure the file is accessed from the root, not relative to /deKodeX
    const fullUrl = `${window.location.origin}${testcaseUrl}`;

    const newWindow = window.open(fullUrl, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.document.title = "Test Case";
    }
  };

  return (
    <button
      className="h-[42px] rounded-lg border border-cyan-300/20 bg-cyan-300/90 px-4 text-sm font-semibold text-[#01011B] transition-colors hover:cursor-pointer hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-300/30 focus:outline-none"
      onClick={() => openTestCaseTab(testcaseUrl)}
    >
      Get input
    </button>
  );
}
export default GetInput;
