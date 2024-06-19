@echo off

REM USERS and EDUCATION HISTORY
REM 1
powershell -Command ^
    $userResponse = Invoke-WebRequest -Uri "http://localhost:8089/api/v1/users/register" -Method Post -ContentType "application/json" -Body '{ ^
        "username": "michaelw", ^
        "password": "fakepassword", ^
        "email": "michaelw@gmail.com", ^
        "firstName": "Michael", ^
        "lastName": "Walsh", ^
        "role": "STUDENT" ^
    }'; ^
    $userResponse.Content; ^
    $userId = ($userResponse.Content | ConvertFrom-Json).userId; ^
    Invoke-WebRequest -Uri "http://localhost:8089/api/v1/users/$userId/education-history" -Method Post -ContentType "application/json" -Body '{ ^
        "userId": "' + $userId + '", ^
        "institutionName": "University College Dublin", ^
        "degree": "BSc in Computer Science", ^
        "major": "Computer Science", ^
        "startDate": "2020-01-01", ^
        "endDate": "2024-01-01" ^
    }'

REM 2
powershell -Command ^
    $userResponse = Invoke-WebRequest -Uri "http://localhost:8089/api/v1/users/register" -Method Post -ContentType "application/json" -Body '{ ^
        "username": "johnt", ^
        "password": "fakepassword", ^
        "email": "johnt@gmail.com", ^
        "firstName": "John", ^
        "lastName": "Tones", ^
        "role": "STUDENT" ^
    }'; ^
    $userResponse.Content; ^
    $userId = ($userResponse.Content | ConvertFrom-Json).userId; ^
    Invoke-WebRequest -Uri "http://localhost:8089/api/v1/users/$userId/education-history" -Method Post -ContentType "application/json" -Body '{ ^
        "userId": "' + $userId + '", ^
        "institutionName": "Dublin City University", ^
        "degree": "BSc in Cloud Computing", ^
        "major": "Cloud Computing", ^
        "startDate": "2018-01-01", ^
        "endDate": "2022-01-01" ^
    }'

REM 3
powershell -Command ^
    $userResponse = Invoke-WebRequest -Uri "http://localhost:8089/api/v1/users/register" -Method Post -ContentType "application/json" -Body '{ ^
        "username": "jackl", ^
        "password": "fakepassword", ^
        "email": "jackl@gmail.com", ^
        "firstName": "Jack", ^
        "lastName": "Leone", ^
        "role": "RECRUITER" ^
    }'; ^
    $userResponse.Content

REM COMPANIES and INTERNSHIPS
REM 1
powershell -Command ^
    $companyResponse = Invoke-WebRequest -Uri "http://localhost:8089/api/v1/companies" -Method Post -ContentType "application/json" -Body '{ ^
        "companyName": "HubSpot", ^
        "industry": "Information Technology", ^
        "location": "Dublin, Ireland", ^
        "website": "https://www.hubspot.com/" ^
    }'; ^
    $companyResponse.Content; ^
    $companyId = ($companyResponse.Content | ConvertFrom-Json).companyId; ^
    Invoke-WebRequest -Uri "http://localhost:8089/api/v1/internships" -Method Post -ContentType "application/json" -Body '{ ^
        "company": {"companyId": "' + $companyId + '"}, ^
        "jobTitle": "Software Engineering Intern", ^
        "description": "Assist with developing software applications.", ^
        "location": "Dublin, Ireland", ^
        "duration": "3 months", ^
        "qualifications": "Pursuing a degree in Computer Science or related field.", ^
        "applicationDeadline": "2024-12-31" ^
    }'

REM 2
powershell -Command ^
    $companyResponse = Invoke-WebRequest -Uri "http://localhost:8089/api/v1/companies" -Method Post -ContentType "application/json" -Body '{ ^
        "companyName": "Google", ^
        "industry": "Information Technology", ^
        "location": "Dublin, Ireland", ^
        "website": "https://www.google.com/" ^
    }'; ^
    $companyResponse.Content; ^
    $companyId = ($companyResponse.Content | ConvertFrom-Json).companyId; ^
    Invoke-WebRequest -Uri "http://localhost:8089/api/v1/internships" -Method Post -ContentType "application/json" -Body '{ ^
        "company": {"companyId": "' + $companyId + '"}, ^
        "jobTitle": "Site Reliability Engineer Intern", ^
        "description": "Assist with managing cloud computing infrastructure.", ^
        "location": "Dublin, Ireland", ^
        "duration": "6 months", ^
        "qualifications": "Pursuing a degree in Computer Science or related field.", ^
        "applicationDeadline": "2024-12-25" ^
    }'

REM 3
powershell -Command ^
    $companyResponse = Invoke-WebRequest -Uri "http://localhost:8089/api/v1/companies" -Method Post -ContentType "application/json" -Body '{ ^
        "companyName": "Microsoft", ^
        "industry": "Information Technology", ^
        "location": "Dublin, Ireland", ^
        "website": "https://www.microsoft.com/en-us/" ^
    }'; ^
    $companyResponse.Content; ^
    $companyId = ($companyResponse.Content | ConvertFrom-Json).companyId; ^
    Invoke-WebRequest -Uri "http://localhost:8089/api/v1/internships" -Method Post -ContentType "application/json" -Body '{ ^
        "company": {"companyId": "' + $companyId + '"}, ^
        "jobTitle": "DevOps Intern", ^
        "description": "Assist with managing CI/CD pipelines and automation testing.", ^
        "location": "Dublin, Ireland", ^
        "duration": "9 months", ^
        "qualifications": "Pursuing a degree in Computer Science or related field.", ^
        "applicationDeadline": "2024-12-19" ^
    }'

REM 4
powershell -Command ^
    $companyResponse = Invoke-WebRequest -Uri "http://localhost:8089/api/v1/companies" -Method Post -ContentType "application/json" -Body '{ ^
        "companyName": "Amazon", ^
        "industry": "Information Technology", ^
        "location": "Dublin, Ireland", ^
        "website": "https://www.amazon.com/" ^
    }'; ^
    $companyResponse.Content; ^
    $companyId = ($companyResponse.Content | ConvertFrom-Json).companyId; ^
    Invoke-WebRequest -Uri "http://localhost:8089/api/v1/internships" -Method Post -ContentType "application/json" -Body '{ ^
        "company": {"companyId": "' + $companyId + '"}, ^
        "jobTitle": "Cloud Computing Intern", ^
        "description": "Assist with developing and maintaining cloud infrastructure.", ^
        "location": "Dublin, Ireland", ^
        "duration": "6 months", ^
        "qualifications": "Pursuing a degree in Computer Science or related field.", ^
        "applicationDeadline": "2024-12-15" ^
    }'

REM 5
powershell -Command ^
    $companyResponse = Invoke-WebRequest -Uri "http://localhost:8089/api/v1/companies" -Method Post -ContentType "application/json" -Body '{ ^
        "companyName": "Facebook", ^
        "industry": "Information Technology", ^
        "location": "Dublin, Ireland", ^
        "website": "https://www.facebook.com/" ^
    }'; ^
    $companyResponse.Content; ^
    $companyId = ($companyResponse.Content | ConvertFrom-Json).companyId; ^
    Invoke-WebRequest -Uri "http://localhost:8089/api/v1/internships" -Method Post -ContentType "application/json" -Body '{ ^
        "company": {"companyId": "' + $companyId + '"}, ^
        "jobTitle": "Data Science Intern", ^
        "description": "Assist with data analysis and machine learning projects.", ^
        "location": "Dublin, Ireland", ^
        "duration": "6 months", ^
        "qualifications": "Pursuing a degree in Computer Science or related field.", ^
        "applicationDeadline": "2024-12-20" ^
    }'
