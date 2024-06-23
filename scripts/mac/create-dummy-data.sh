#!/bin/bash

###### USERS and EDUCATION HISTORY ######
# 1
USER_RESPONSE=$(curl -s -X POST "http://localhost:8089/api/v1/users/register" -H "Content-Type: application/json" -d '{
    "username": "michaelw",
    "password": "fakepassword",
    "email": "michaelw@gmail.com",
    "firstName": "Michael",
    "lastName": "Walsh",
    "role": "STUDENT"
}')
echo $USER_RESPONSE
USER_ID=$(echo $USER_RESPONSE | jq -r '.userId')
EDUCATION_RESPONSE=$(curl -s -X POST "http://localhost:8089/api/v1/users/$USER_ID/education-history" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{
    "userId": '"$USER_ID"',
    "institutionName": "University College Dublin",
    "degree": "BSc in Computer Science",
    "major": "Computer Science",
    "startDate": "2020-01-01",
    "endDate": "2024-01-01"
}')
echo $EDUCATION_RESPONSE

# 2
USER_RESPONSE=$(curl -s -X POST "http://localhost:8089/api/v1/users/register" -H "Content-Type: application/json" -d '{
    "username": "johnt",
    "password": "fakepassword",
    "email": "johnt@gmail.com",
    "firstName": "John",
    "lastName": "Tones",
    "role": "STUDENT"
}')
echo $USER_RESPONSE
USER_ID=$(echo $USER_RESPONSE | jq -r '.userId')
EDUCATION_RESPONSE=$(curl -s -X POST "http://localhost:8089/api/v1/users/$USER_ID/education-history" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{
    "userId": '"$USER_ID"',
    "institutionName": "Dublin City University",
    "degree": "BSc in Cloud Computing",
    "major": "Cloud Computing",
    "startDate": "2018-01-01",
    "endDate": "2022-01-01"
}')
echo $EDUCATION_RESPONSE

# 3
USER_RESPONSE=$(curl -s -X POST "http://localhost:8089/api/v1/users/register" -H "Content-Type: application/json" -d '{
    "username": "jackl",
    "password": "fakepassword",
    "email": "jackl@gmail.com",
    "firstName": "Jack",
    "lastName": "Leone",
    "role": "RECRUITER"
}')
echo $USER_RESPONSE


###### COMPANIES and INTERNSHIPS ######
# 1
COMPANY_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/companies -H "Content-Type: application/json" -d '{
    "companyName":"HubSpot",
    "industry":"Information Technology",
    "location":"Dublin, Ireland",
    "website":"https://www.hubspot.com/"
}')
echo $COMPANY_RESPONSE
COMPANY_ID=$(echo $COMPANY_RESPONSE | jq -r '.companyId')
INTERNSHIP_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/internships -H "Content-Type: application/json" -d '{
    "company":{"companyId":'"$COMPANY_ID"'},
    "jobTitle":"Software Engineering Intern",
    "description":"Assist with developing software applications.",
    "location":"Dublin, Ireland",
    "duration":"3 months",
    "qualifications":"Pursuing a degree in Computer Science or related field.",
    "applicationDeadline":"2024-12-31"
}')
echo $INTERNSHIP_RESPONSE

# 2
COMPANY_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/companies -H "Content-Type: application/json" -d '{
    "companyName": "Google",
    "industry":"Information Technology",
    "location":"Dublin, Ireland",
    "website":"https://www.google.com/"
}')
echo $COMPANY_RESPONSE
COMPANY_ID=$(echo $COMPANY_RESPONSE | jq -r '.companyId')
INTERNSHIP_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/internships -H "Content-Type: application/json" -d '{
    "company":{"companyId":'"$COMPANY_ID"'},
    "jobTitle":"Site Reliability Engineer Intern",
    "description":"Assist with managing cloud computing infrastructure.",
    "location":"Dublin, Ireland",
    "duration":"6 months",
    "qualifications":"Pursuing a degree in Computer Science or related field.",
    "applicationDeadline":"2024-12-25"
}')
echo $INTERNSHIP_RESPONSE

# 3
COMPANY_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/companies -H "Content-Type: application/json" -d '{
    "companyName": "Microsoft",
    "industry":"Information Technology",
    "location":"Dublin, Ireland",
    "website":"https://www.microsoft.com/en-us/"
}')
echo $COMPANY_RESPONSE
COMPANY_ID=$(echo $COMPANY_RESPONSE | jq -r '.companyId')
INTERNSHIP_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/internships -H "Content-Type: application/json" -d '{
    "company":{"companyId":'"$COMPANY_ID"'},
    "jobTitle":"DevOps Intern",
    "description":"Assist with managing CI/CD pipelines and automation testing.",
    "location":"Dublin, Ireland",
    "duration":"9 months",
    "qualifications":"Pursuing a degree in Computer Science or related field.",
    "applicationDeadline":"2024-12-19"
}')
echo $INTERNSHIP_RESPONSE

# 4
COMPANY_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/companies -H "Content-Type: application/json" -d '{
    "companyName": "Amazon",
    "industry": "Information Technology",
    "location": "Dublin, Ireland",
    "website": "https://www.amazon.com/"
}')
echo $COMPANY_RESPONSE
COMPANY_ID=$(echo $COMPANY_RESPONSE | jq -r '.companyId')
INTERNSHIP_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/internships -H "Content-Type: application/json" -d '{
    "company": {"companyId": '"$COMPANY_ID"'},
    "jobTitle": "Cloud Computing Intern",
    "description": "Assist with developing and maintaining cloud infrastructure.",
    "location": "Dublin, Ireland",
    "duration": "6 months",
    "qualifications": "Pursuing a degree in Computer Science or related field.",
    "applicationDeadline": "2024-12-15"
}')
echo $INTERNSHIP_RESPONSE

# 5
COMPANY_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/companies -H "Content-Type: application/json" -d '{
    "companyName": "Facebook",
    "industry": "Information Technology",
    "location": "Dublin, Ireland",
    "website": "https://www.facebook.com/"
}')
echo $COMPANY_RESPONSE
COMPANY_ID=$(echo $COMPANY_RESPONSE | jq -r '.companyId')
INTERNSHIP_RESPONSE=$(curl -s -X POST http://localhost:8089/api/v1/internships -H "Content-Type: application/json" -d '{
    "company": {"companyId": '"$COMPANY_ID"'},
    "jobTitle": "Data Science Intern",
    "description": "Assist with data analysis and machine learning projects.",
    "location": "Dublin, Ireland",
    "duration": "6 months",
    "qualifications": "Pursuing a degree in Computer Science or related field.",
    "applicationDeadline": "2024-12-20"
}')
echo $INTERNSHIP_RESPONSE
