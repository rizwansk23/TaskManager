const GenerateId = ():string => {
  const guestId = localStorage.getItem("guestId") ?? crypto.randomUUID();

  localStorage.setItem("guestId", guestId);
  return guestId;
};


export default GenerateId;
