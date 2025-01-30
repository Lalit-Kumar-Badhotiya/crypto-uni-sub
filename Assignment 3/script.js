
const name = "Manish";
const predefinedText = `${name} says hello to blockchain`;

async function computeSHA256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
}


async function checkHash() {
  const input = document.getElementById("textInput").value;

  // Compute the hash of the predefined text
  const predefinedHash = await computeSHA256(predefinedText);
  
  // Display the original hash on the page
  document.getElementById("originalHash").textContent = predefinedHash;

  // Compute the hash of the input text
  const inputHash = await computeSHA256(input);

  // Display the generated hash on the page
  document.getElementById("generatedHash").textContent = inputHash;

  // Compare hashes
  const result = document.getElementById("result");
  if (inputHash === predefinedHash) {
    result.textContent = "Hash Matched";
    result.style.color = "green";
  } else {
    result.textContent = "Hash Not Matched";
    result.style.color = "red";
  }
}

// Attach event listener to input box
document.getElementById("textInput").addEventListener("input", checkHash);

// Display the original hash initially
computeSHA256(predefinedText).then(hash => {
  document.getElementById("originalHash").textContent = hash;
});
