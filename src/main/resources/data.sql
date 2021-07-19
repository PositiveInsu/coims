INSERT INTO ROLE (role_id, role) values
(1, 'ADMIN'),
(2, 'MANAGER'),
(3, 'USER');

INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
(0, 'Study Permit'             , 0,     'SP'     , 1, -1, 0),
(0, 'Work Permit'              , 0,     'WP'     , 1, -1, 0),
(0, 'Visitor Record'           , 0,     'VV'     , 0, -1, 0),
(0, 'Temporary Resident Visa'  , 0,     'TRV'    , 0, -1, 0),
(0, 'Restoration'              , 0,     'RESTO'  , 1, -1, 0),
(0, 'Transit Visa'             , 0,     'TV'     , 0, -1, 0),
(0, 'Super Visa'               , 0,     'SV'     , 0, -1, 0),
(0, 'TRP'                      , 0,     'TRP'    , 0, -1, 0),
(0, 'eTA'                      , 0,     'ETA'    , 0, -1, 0),

(0, 'EE'                       , 1,     'EE'     , 1, -1, 0),
(0, 'Sponsorship'              , 1,     'SPON'   , 1, -1, 0),
(0, 'Refugee'                  , 1,     'RFG'    , 0, -1, 0),
(0, 'Entrepreneur'             , 1,     'ENTRE'  , 0, -1, 0),
(0, 'Caregivers'               , 1,     'CARE'   , 0, -1, 0),
(0, 'Self-Employed'            , 1,     'SE'     , 0, -1, 0),
(0, 'Quebec'                   , 1,     'QC'     , 1, -1, 0),

(0, 'MPNP'                     , 2,     'MPNP'   , 1, -1, 0),
(0, 'MPNP Business'            , 2,     'MPNPB'  , 1, -1, 0),

(0, 'LMIA'                     , 3,     'LMIA'   , 0, -1, 0),
(0, 'PR Extension'             , 3,     'PR-EX'  , 0, -1, 0),
(0, 'Citizenship'              , 3,     'CITI'   , 0, -1, 0),
(0, 'Rehabilitation'           , 3,     'REHB'   , 0, -1, 0),
(0, 'Replace Document'         , 3,     'R-DOC'  , 0, -1, 0),
(0, 'Employer Compliance'      , 3,     'EMP'    , 0, -1, 0),

(0, 'Business Setup'           , 4,     'B-SET'  , 0, -1, 0),
(0, 'Settlement Service'       , 4,     'SETMNT' , 0, -1, 0),
(0, 'Recruitment'              , 4,     'RECRUT' , 0, -1, 0),
(0, 'LoA'                      , 4,     'LOA'    , 0, -1, 0);




-- Study Permit
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "SP"), 'New'                      , 0,     'SP-NEW'    , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "SP"), 'Extend'                   , 0,     'SP-EXT'    , 0, -1, 0);

-- Work Permit
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "WP"), 'Close'                    , 0,     'WP-C'      , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "WP"), 'Open'                     , 0,     'WP-OP'     , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "WP"), 'Extend'                   , 0,     'WP-EX'     , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "WP"), 'PGWP'                     , 0,     'WP-PG'     , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "WP"), 'BOWP'                     , 0,     'WP-BO'     , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "WP"), 'Start-Up'                 , 0,     'WP-SU'     , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "WP"), 'Quebec'                   , 0,     'WP-QC'     , 0, -1, 0);
-- Restoration
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "RESTO"), 'Study Permit'          , 0,     'RESTO-S'   , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "RESTO"), 'Work Permit'           , 0,     'RESTO-W'   , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "RESTO"), 'Visitor Visa'          , 0,     'RESTO-V'   , 0, -1, 0);
-- EE
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "EE"), 'Skilled Worker'           , 1,     'EE-SW'     , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "EE"), 'Skilled Trades'           , 1,     'EE-ST'     , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "EE"), 'Canadian Experience Class', 1,     'EE-CEC'    , 0, -1, 0);
-- Sponsor
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "SPON"), 'Parents/Grandparents'   , 1,     'SPON-P'    , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "SPON"), 'Spouse'                 , 1,     'SPON-S'    , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "SPON"), 'Children'               , 1,     'SPON-C'    , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "SPON"), 'Adopted Children'       , 1,     'SPON-AC'   , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "SPON"), 'Relatives'              , 1,     'SPON-R'    , 0, -1, 0);
-- Quebec
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "QC"), 'Skilled Worker'           , 1,     'QC-SK'     , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "QC"), 'Investor'                 , 1,     'QC-IV'     , 0, -1, 0);
-- MPNP
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "MPNP"), 'EoI'                    , 2,     'MPNP-E'    , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "MPNP"), 'PNP'                    , 2,     'MPNP-P'    , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "MPNP"), 'Federal'                , 2,     'MPNP-F'    , 0, -1, 0);
-- MPNPB
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "MPNPB"), 'Exploratory'           , 2,     'MPNPB-EX'  , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "MPNPB"), 'EoI'                   , 2,     'MPNPB-E'   , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "MPNPB"), 'PNP'                   , 2,     'MPNPB-P'   , 0, -1, 0);
INSERT INTO CASE_TYPE( PID, NAME, CATEGORY, CODE, HAS_CHILD, COMPANY_ID, GOVERNMENT_FEE) VALUES
((SELECT DISTINCT D.CASE_TYPE_id AS cid FROM CASE_TYPE AS D WHERE code = "MPNPB"), 'Federal'               , 2,     'MPNPB-F'   , 0, -1, 0);

-- Default Document List
Insert Into document( category, name, code, company_id) values
(0, "Passport", "PSPT", -1),
(0, "Permit", "PM", -1),
(0, "Photo", "PT", -1),
(0, "Marriage Certificate", "MC", -1),
(0, "Birth Certificate", "BC", -1),
(0, "Family Certificate", "FC", -1),
(0, "Questionnaire", "QE", -1),
(1, "Letter of Acceptance", "LOA", -1),
(1, "Post-Secondary Transcript", "PSTRS", -1),
(1, "Post-Secondary Graduation", "PSGRAD", -1),
(1, "High School Transcript", "HSTRS", -1),
(1, "High School Graduation", "HSGRAD", -1),
(1, "Enrollment Letter", "ENLT", -1),
(1, "Completion Letter", "CMLT", -1),
(1, "Tuition Receipt", "TRCPT", -1),
(2, "Job Offer Letter", "JOLT", -1),
(2, "Pay Stub", "PSTUB", -1),
(2, "LMIA Letter", "LMIA", -1),
(2, "HRSDC File No", "HRSDC", -1),
(3, "Previous Visa Refusal Letter", "RFSLT", -1),
(4, "Entry Exit", "ENEX", -1),
(5, "Relative Proof", "RLPRF", -1),
(5, "Friend Proof", "FRPRF", -1),
(6, "Language Result", "LRST", -1),
(7, "Bank Statement", "BSTMT", -1),
(7, "3 Months Transaction", "3MTRS", -1),
(7, "6 Months Transaction", "6MTRS", -1),
(8, "IMM5646 Custodian", "5646C", -1),
(8, "IMM5646 Parents", "5646P", -1),
(8, "Financial Support Letter", "FSLT", -1),
(8, "Custodian Letter",	"CUSLT", -1),
(9, "Criminal Record", "CR", -1),
(9, "FBI Criminal Record", "FCR", -1),
(10, "Resume", "RSM", -1),
(10, "Study Plan", "SPL", -1),
(10, "EMedical Document", "EMEDI", -1),
(11, "Agreement", "AGREE", -1),
(11, "Company Receipt", "CRCPT", -1),
(11, "IMM5476", "5476", -1);

Insert Into CASE_STATUS( step_no, name, type) values
(0,	"Contract", 'COMMON'),
(1,	"Payment", 'COMMON'),
(2,	"Prepare", 'COMMON'),
(3,	"Review", 'COMMON'),
(4,	"Ready", 'COMMON'),
(5,	"Submitted", 'COMMON'),
(6,	"Processing", 'COMMON'),
(7,	"Result", 'COMMON'),
(8,	"Complete", 'COMMON');

























