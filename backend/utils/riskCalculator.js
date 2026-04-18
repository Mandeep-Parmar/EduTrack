const calculateRisk = ({
  attendance = 0,
  marks = 0,
  assignment = 0,
  lms = 0
}) => {

  let riskScore = 0;
  let reasons = [];

  // 🔹 Attendance (weight: 30)
  if (attendance < 75) {
    const val = ((75 - attendance) / 75) * 30;
    riskScore += val;
    reasons.push(`Low attendance (${attendance}%)`);
  }

  // 🔹 Marks (weight: 30)
  if (marks < 50) {
    const val = ((50 - marks) / 50) * 30;
    riskScore += val;
    reasons.push(`Low marks (${marks})`);
  }

  // 🔹 Assignment (weight: 20)
  if (assignment < 50) {
    const val = ((50 - assignment) / 50) * 20;
    riskScore += val;
    reasons.push(`Low assignment score (${assignment})`);
  }

  // 🔹 LMS Activity (weight: 20)
  if (lms < 50) {
    const val = ((50 - lms) / 50) * 20;
    riskScore += val;
    reasons.push(`Low LMS activity (${lms})`);
  }

  // 🔹 Normalize
  riskScore = Math.min(100, Math.round(riskScore));

  // 🔹 Risk Level
  let riskLevel = "Low";
  if (riskScore >= 70) riskLevel = "High";
  else if (riskScore >= 40) riskLevel = "Medium";

  return {
    riskScore,
    riskLevel,
    reasons
  };
};

export default calculateRisk;