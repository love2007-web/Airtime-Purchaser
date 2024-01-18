import { ArrowForwardIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Data = () => {
  const [serviceID, setServiceID] = useState("");
  const [showInp, setShowInp] = useState(false);
  const [variations, setVariations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedVariationCode, setSelectedVariationCode] = useState(null);
  const [selectedVariationAmount, setSelectedVariationAmount] = useState(null);
  const [billersCode, setbillersCode] = useState("");
  const [inpPhone, setinpPhone] = useState(null);
  let phoneNumber = localStorage.getItem("phoneNumber");
  const public_key = "PK_475a00edabb7fa3f255b586cafff2f29c5302f77f08";
  const secret_key = "SK_936bfe44a22cf0dd18209c7592511244dc72f6bb84a";
  const api_key = "a188d4ad0d989412c1560a88807d5323";

  const config = {
    headers: {
      "api-key": api_key,
      "public-key": public_key,
      "secret-key": secret_key,
      // other headers if needed
    },
  };

  const getData = (id) => {
    axios
      .get(
        `https://api-service.vtpass.com/api/service-variations?serviceID=${id}`
      )
      .then((res) => {
        console.log(res.data.content.variations);
        setVariations(res.data.content.variations);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const setService = (id) => {
    setServiceID(id);
    console.log(serviceID);
    setShowInp(true);
    setSelectedButton(null);
    setSelectedVariationCode(null);
    setSelectedVariationAmount(null);
  };

  const setmtn = () => {
    setIsLoading(true);
    setService("mtn-data");
    getData("mtn-data");
  };

  const setglo = () => {
    setIsLoading(true);
    setService("glo-data");
    getData("glo-data");
  };

  const setairtel = () => {
    setIsLoading(true);
    setService("airtel-data");
    getData("airtel-data");
  };

  const setetisalat = () => {
    setIsLoading(true);
    setService("etisalat-data");
    getData("etisalat-data");
  };

  const logVariationName = (i) => {
    setShowInp(true);
    console.log(variations[i].variation_code);
    console.log(variations[i].variation_amount);
    setbillersCode(localStorage.getItem("phoneNumber"));
    setSelectedVariationCode(variations[i].variation_code);
    setSelectedVariationAmount(variations[i].variation_amount);
    setSelectedButton(i);
  };

  useEffect(() => {
    console.log(selectedVariationCode);
    console.log(selectedVariationAmount);
  }, [selectedVariationCode, selectedVariationAmount]);

  function generateRequestId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    const requestId = year + month + day + hour + minute;

    // Generate a random alphanumeric string
    const randomString = Math.random().toString(36).substring(2, 15);

    return requestId + randomString;
  }

  const pay = () => {
    setIsLoading(true);
    const requestId = generateRequestId();
    const data = {
      billersCode: billersCode,
      serviceID: serviceID,
      variation_code: selectedVariationCode,
      amount: selectedVariationAmount,
      request_id: requestId,
      phone: inpPhone || phoneNumber,
    };
    console.log(data);

    axios
      .post("https://api-service.vtpass.com/api/pay", data, config)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.response_description);
      }).catch((error)=>{
        console.log(error.response.data);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  const mtn =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAh1BMVEX/ywD/ywH/zwD/zQAAAAYAAAD/0wAAAAn/0QD2xgoAAAO6mg7ovwz/1QAAAA36ywrwww1xXgyoiwnftQjXsAx1Yw49Ng0ABwikiBBmVRFBOAmPdgyxkAteTw+3lxKIcRJ9ag8UEworJQ0eHA7RqhAiIRCegxTMqxdMQhbDoAtpWAwtKQtRRgrE099zAAACV0lEQVRIie1V7XabMAw1krAwHzXBJmGFBtIkdGny/s83OyVtSEi7/dl2TirOAQtzdWXryohAvF0iGF3TwzP39PB2Nvnh3pr5Iu43450w/oNUnZ3HPXNvzPxHa8TBfr8cQgBICTpPjUlz7ceAXzMiSLRVOV8wHY15PqssSMBPGTHSyQ9mih9ndVU0TVHVs0eimJ+WWqK4xSiivGVadEkKWeQMANw9g3TXrYi6XOI0I0Z1zKV1ABTnS3bpR9J2zC3CBGMA6fMxqhhv8mAgVUvrFK4ZwfCDPSbj9sG5iODN3V0ungmlXZGBy81F/bBSx7dquYkELjdmmSTJMl++ANhG+w9Bb1nhmFFEnYvmh6hizrM+LPvQmyG2WU/KV1JAyjN5wQg8y8QbkMKnnMMyN3X4YjWFWzkAAyE70uOqoAmXUTAA1/GWXeioCHMIaB53xQkIu9hicAmEE7Cah8XzTIIDoua+pZ/xAMRdvLkAIpfZOzCt5OodWGf7cGAMZHuZqohKSofNod7Jml8lVGHqgG1meGDEnK42BxWvh3IUFlw5doC2UBgUG4heCuU+DEDvOcdrAdDKet0MAoDAadC/R99nRwGYNdsrAbhkzZpaNS05h5e6pYWJpkQO2BK3Ro5FHryJ3Li+6TROtxXKtGPa1rtcSnnsKt9WUua7+pmoTG+1lV9HpJoDx7Q4dH3RJElT9N1hQTEdGiXHBRyvxEOl3vSve3dyxN6I96/9Rks4le+Tw8ovSYJKjbUmVS7SRWdPM360vWvIPzser9zpmZP/1/8dd/FH/ma8U8ZfAxAjCXQUrroAAAAASUVORK5CYII=";
  const airtel =
    "data:image/jpeg;base64,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";
  const glo =
    "data:image/jpeg;base64,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";
  const etisalat =
    "data:image/png;base64,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";

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-10 bg-opacity-75 backdrop-filter backdrop-blur-sm">
          <div className="flex items-center justify-center h-screen">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : null}

      <Text fontSize={"2xl"} className="text-center">
        Choose your Network
      </Text>
      <Container>
        <Box w={"100%"} bg={"tomato"} p={"1"} className="flex justify-between">
          <button className="bg-blue-600" onClick={setmtn}>
            <Image boxSize={"100px"} src={mtn} alt="mtn" />
          </button>
          <button className="bg-blue-600" onClick={setglo}>
            <Image boxSize={"100px"} src={glo} alt="glo" />
          </button>
          <button className="bg-blue-600" onClick={setairtel}>
            <Image boxSize={"100px"} src={airtel} alt="airtel" />
          </button>
          <button className="bg-blue-600" onClick={setetisalat}>
            <Image boxSize={"100px"} src={etisalat} alt="etisalat" />
          </button>
        </Box>

        <Box>
          {variations.length > 0 && (
            <div>
              <Text fontSize={"2xl"}>Data Plans</Text>
              <Stack>
                {variations.map((variation, i) => (
                  <div key={i}>
                    <Button
                      onClick={() => logVariationName(i)}
                      style={{
                        backgroundColor:
                          selectedButton === i ? "teal" : "inherit",
                      }}
                    >
                      {variation.name}
                    </Button>
                  </div>
                ))}
              </Stack>
            </div>
          )}
        </Box>

        {showInp && (
          <Stack spacing={4} mt={"4"}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input
                defaultValue={phoneNumber}
                type="tel"
                placeholder="Phone number"
                onChange={(e) => setinpPhone(e.target.value)}
              />
            </InputGroup>
            <Button colorScheme="teal" size="md" onClick={pay} mt={"2"}>
              Pay
              <ArrowForwardIcon ml={"2"} />
            </Button>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Data;
