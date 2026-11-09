"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { translations } from "../i18n/translations";

type Language = "en" | "he";
type Category = "API" | "SECURITY" | "AUTOMATION" | "TEST DESIGN" | "RELIABILITY" | "INFRASTRUCTURE";
type Difficulty = 1 | 2 | 3 | 4 | 5;
type Choice = 0 | 1 | 2 | 3;
type Texts = { prompt: string; options: readonly [string, string, string, string]; explanation: string };
type Scenario = {
  id: string;
  level: Difficulty;
  topic: Category;
  trace: string;
  correct: Choice;
  en: Texts;
  he: Texts;
};
type Phase = "intro" | "playing" | "results";

// Fictional QA scenarios for learning. No real incidents or live systems are represented.
// Five adaptive incidents + one expert boss per run, all with four plausible answers.
const QUESTIONS: Scenario[] = [
  // LEVEL 1 — Foundation (technical, not trivia)
  {
    id: "l1-created", level: 1, topic: "API", trace: "POST /users  →  201 Created", correct: 2,
    en: { prompt: "The create request returned 201. Which follow-up gives the strongest verification?", options: ["Check that POST response time is below 1 second", "Repeat POST and expect another 201", "GET the new resource and verify persisted fields", "Validate only that the response has a Location header"], explanation: "201 and a Location header are useful, but a follow-up GET verifying persisted fields checks the resulting resource state." },
    he: { prompt: "יצירת משתמש החזירה 201. איזו בדיקת המשך נותנת אימות חזק ביותר?", options: ["לוודא שזמן התגובה קצר משנייה", "לחזור על POST ולצפות שוב ל־201", "לבצע GET ולאמת את השדות שנשמרו", "לוודא רק שיש כותרת Location"], explanation: "קוד 201 וכותרת Location מועילים, אבל שליפת המשאב ובדיקת הנתונים מאמתות גם את המצב שנוצר בפועל." },
  },
  {
    id: "l1-expired", level: 1, topic: "SECURITY", trace: "GET /me   Authorization: Bearer EXPIRED", correct: 0,
    en: { prompt: "The access token has expired. Which response is normally appropriate?", options: ["401 Unauthorized", "403 Forbidden", "409 Conflict", "422 Unprocessable Content"], explanation: "401 signals missing or invalid authentication credentials. 403 is normally used when access is forbidden despite valid authentication." },
    he: { prompt: "טוקן הגישה פג תוקף. איזה קוד תגובה מתאים בדרך כלל?", options: ["401 Unauthorized", "403 Forbidden", "409 Conflict", "422 Unprocessable Content"], explanation: "401 מציין בעיית אימות. 403 מתאים בדרך כלל לבקשה שאין למשתמש מזוהה הרשאה לבצע." },
  },
  {
    id: "l1-locator", level: 1, topic: "AUTOMATION", trace: ".product-card:nth-child(2)  →  FLAKY", correct: 1,
    en: { prompt: "Product cards change order between runs. What locator should replace the positional selector?", options: ["A longer positional CSS selector", "A stable test ID or appropriately scoped accessible locator", "A screenshot coordinate", "A fixed wait before clicking the second card"], explanation: "Stable identifiers or semantic locators scoped to the intended product avoid depending on list order." },
    he: { prompt: "סדר כרטיסי המוצרים משתנה בין הרצות. איזה איתור מתאים יותר?", options: ["בורר CSS ארוך יותר שמבוסס על מיקום", "מזהה בדיקה יציב או איתור סמנטי ממוקד", "קואורדינטות מצילום מסך", "המתנה קבועה לפני לחיצה על הכרטיס השני"], explanation: "איתור יציב שמכוון למוצר הרצוי אינו תלוי בסדר הפריטים ברשימה." },
  },
  {
    id: "l1-bva", level: 1, topic: "TEST DESIGN", trace: "quantity ∈ [1, 5]  // inclusive", correct: 3,
    en: { prompt: "Which compact set best targets both valid and invalid quantity boundaries?", options: ["1, 2, 3, 4", "1, 3, 5", "0, 2, 4, 6", "0, 1, 5, 6"], explanation: "0 and 6 are just outside the allowed interval, while 1 and 5 test its valid edges." },
    he: { prompt: "איזו קבוצה מכסה בצורה ממוקדת גבולות תקינים ולא תקינים?", options: ["1, 2, 3, 4", "1, 3, 5", "0, 2, 4, 6", "0, 1, 5, 6"], explanation: "0 ו־6 נמצאים ממש מחוץ לטווח התקין; 1 ו־5 בודקים את הגבולות התקינים עצמם." },
  },
  {
    id: "l1-accepted", level: 1, topic: "RELIABILITY", trace: "POST /exports  →  202 Accepted", correct: 1,
    en: { prompt: "An export API returns 202. What does the test still need to verify?", options: ["That the export must have already finished", "That the asynchronous job eventually reaches the expected outcome", "That the API response body is always empty", "That any later job failure is outside the test scope"], explanation: "202 means the request was accepted, not that the asynchronous operation completed. Check the job outcome separately." },
    he: { prompt: "שרת ייצוא מחזיר 202. מה עדיין צריך לאמת?", options: ["שהייצוא כבר הסתיים בהכרח", "שהמשימה האסינכרונית מגיעה בסוף לתוצאה הצפויה", "שגוף התגובה חייב תמיד להיות ריק", "שכישלון עתידי של המשימה אינו רלוונטי"], explanation: "202 מציין שהבקשה התקבלה לעיבוד, לא שהפעולה הסתיימה. צריך לבדוק בנפרד את תוצאת המשימה." },
  },
  {
    id: "l1-deleted", level: 1, topic: "API", trace: "DELETE /items/51  →  204 No Content", correct: 2,
    en: { prompt: "How do you best verify the effect of a successful DELETE?", options: ["Assert the response contains the deleted object", "Run DELETE repeatedly until it returns 500", "Read the resource again and verify it is no longer available", "Check only that the button disappeared"], explanation: "A follow-up read tests the post-deletion state rather than relying solely on the initial status code." },
    he: { prompt: "איך בודקים בצורה הטובה ביותר את התוצאה של DELETE מוצלח?", options: ["לצפות לגוף תגובה עם האובייקט שנמחק", "לחזור על DELETE עד שמתקבל 500", "לנסות לקרוא את המשאב ולוודא שאינו זמין עוד", "לבדוק רק שהכפתור נעלם"], explanation: "שליפה חוזרת מאמתת את מצב המשאב לאחר המחיקה, מעבר לקוד התגובה הראשוני." },
  },
  {
    id: "l1-fixture", level: 1, topic: "AUTOMATION", trace: "TEST A creates user → TEST B depends on A", correct: 0,
    en: { prompt: "A test passes only if another test ran first. What's the best design change?", options: ["Create independent data through fixtures and clean it up", "Enforce one permanent execution order", "Increase the retry count", "Disable parallel execution forever"], explanation: "Independent tests should control their own prerequisites and cleanup instead of relying on execution order." },
    he: { prompt: "בדיקה עוברת רק אם בדיקה אחרת רצה לפניה. מה השינוי הנכון?", options: ["ליצור נתונים עצמאיים באמצעות Fixtures ולנקות אותם", "לחייב סדר הרצה קבוע לנצח", "להגדיל את מספר הניסיונות החוזרים", "לבטל לצמיתות הרצה מקבילית"], explanation: "בדיקות עצמאיות מנהלות את תנאי הקדם והניקוי שלהן, ולא תלויות בסדר ההרצה." },
  },

  // LEVEL 2 — Analyst
  {
    id: "l2-conflict", level: 2, topic: "API", trace: "POST /users  →  existing unique email", correct: 3,
    en: { prompt: "The email is valid, but already belongs to a user. Which status most directly describes the uniqueness conflict?", options: ["400 Bad Request", "401 Unauthorized", "422 Unprocessable Content", "409 Conflict"], explanation: "409 expresses a conflict with the resource's current state, such as a unique-key collision. APIs may document other choices, but 409 is the most specific here." },
    he: { prompt: "האימייל תקין בפורמט, אך כבר רשום במערכת. איזה קוד מתאר ישירות התנגשות במצב הנתונים?", options: ["400 Bad Request", "401 Unauthorized", "422 Unprocessable Content", "409 Conflict"], explanation: "409 מתאים להתנגשות עם מצב המשאב, למשל הפרת ייחודיות. יש מערכות שמתעדות קודים אחרים, אך כאן זה הקוד המדויק ביותר." },
  },
  {
    id: "l2-bola", level: 2, topic: "SECURITY", trace: "User A → GET /orders/owner-B  →  200", correct: 1,
    en: { prompt: "A customer retrieves another customer's order by changing the ID. Which control is missing?", options: ["Function-level authorization on the admin route", "Object-level authorization for the requested order", "Client-side input sanitation", "A stricter CORS allowlist"], explanation: "Each requested order needs a server-side object-level authorization check; this is the defining BOLA risk." },
    he: { prompt: "לקוח שולף הזמנה של לקוח אחר על ידי שינוי מזהה. איזו בדיקה חסרה?", options: ["הרשאת פעולה בנתיב מנהל", "הרשאה ברמת ההזמנה המבוקשת", "סינון קלט בצד הדפדפן", "רשימת CORS מחמירה יותר"], explanation: "השרת חייב לבדוק הרשאה לכל אובייקט מבוקש. זהו הסיכון המרכזי של BOLA." },
  },
  {
    id: "l2-wait", level: 2, topic: "AUTOMATION", trace: "CLICK → UI updates after variable latency", correct: 2,
    en: { prompt: "A UI update takes between 100 ms and 2 seconds. Which assertion is most reliable?", options: ["Use page.wait_for_timeout(2000) before every assertion", "Read inner_text() immediately after the click", "Use Playwright's auto-retrying expect() assertion", "Retry the whole test indefinitely"], explanation: "Auto-retrying assertions wait for the actual condition within a timeout, reducing flaky and unnecessarily slow tests." },
    he: { prompt: "עדכון ממשק מתרחש אחרי 100–2000 אלפיות השנייה. איזו בדיקה יציבה יותר?", options: ["להוסיף wait_for_timeout(2000) לכל בדיקה", "לקרוא inner_text() מיד אחרי הלחיצה", "להשתמש ב־expect() שממתין לתנאי באופן חוזר", "להריץ את כל הטסט מחדש ללא הגבלה"], explanation: "Assertions שממתינים לתנאי הרצוי מגיבים לזמן האמיתי של הממשק ומפחיתים תקלות אקראיות." },
  },
  {
    id: "l2-table", level: 2, topic: "TEST DESIGN", trace: "DISCOUNT = VIP && coupon && total ≥ 200", correct: 0,
    en: { prompt: "The discount depends on three interacting conditions. Which technique best makes the combinations explicit?", options: ["Decision Table Testing", "Boundary Value Analysis alone", "Statement coverage of the UI", "Exploratory testing without a model"], explanation: "A decision table maps combinations of business rules to expected outcomes, making interactions visible." },
    he: { prompt: "הנחה תלויה בשלושה תנאים שמשפיעים זה על זה. איזו טכניקה מתאימה למיפוי הצירופים?", options: ["Decision Table Testing", "Boundary Value Analysis בלבד", "כיסוי שורות קוד בממשק", "בדיקות חקר ללא מודל"] , explanation: "טבלת החלטה ממפה צירופים בין תנאים עסקיים לתוצאות הצפויות ומבליטה פערי כיסוי." },
  },
  {
    id: "l2-429", level: 2, topic: "RELIABILITY", trace: "HTTP 429  |  Retry-After: 12", correct: 3,
    en: { prompt: "An API limits your request rate and sends Retry-After. What's the safest client response?", options: ["Immediately fire four retries in parallel", "Treat all 429s as successful responses", "Disable the rate limit in the client UI", "Wait according to server guidance and retry within a bounded policy"], explanation: "429 signals throttling. Respect Retry-After and use a bounded retry policy rather than amplifying load." },
    he: { prompt: "ה־API מגביל קצב ומחזיר Retry-After. מה התנהגות הלקוח הנכונה?", options: ["לשלוח מיד ארבעה ניסיונות במקביל", "להתייחס לכל 429 כהצלחה", "לבטל בממשק את מגבלת הקצב", "להמתין בהתאם להנחיית השרת ולנסות שוב במדיניות מוגבלת"], explanation: "429 מציין הגבלת קצב. יש לכבד את Retry-After ולהימנע מהגדלת העומס על השרת." },
  },
  {
    id: "l2-422", level: 2, topic: "API", trace: 'POST /users {"age": -4}  // valid JSON', correct: 2,
    en: { prompt: "The JSON syntax is valid, but the age violates domain validation. Which HTTP status is a suitable response?", options: ["202 Accepted", "415 Unsupported Media Type", "422 Unprocessable Content", "503 Service Unavailable"], explanation: "422 is suitable for syntactically valid content whose instructions fail semantic validation." },
    he: { prompt: "מבנה ה־JSON תקין, אך הגיל מפר כלל עסקי. איזה קוד מתאים?", options: ["202 Accepted", "415 Unsupported Media Type", "422 Unprocessable Content", "503 Service Unavailable"], explanation: "422 מתאים לתוכן שהפורמט שלו תקין, אך הערכים שלו אינם עומדים בדרישות העסקיות." },
  },
  {
    id: "l2-bfla", level: 2, topic: "SECURITY", trace: "role=user → POST /admin/ban → 200", correct: 0,
    en: { prompt: "A normal customer successfully runs an admin-only operation. Which defect is most precise?", options: ["BFLA — broken function-level authorization", "BOLA — broken object-level authorization", "BOPLA — broken property-level authorization", "XSS — cross-site scripting"], explanation: "The unauthorized action itself was accessible to the wrong role, indicating function-level authorization failure." },
    he: { prompt: "לקוח רגיל מבצע בהצלחה פעולה שמיועדת רק למנהל. איזו חולשה מתארת זאת?", options: ["BFLA — כשל בהרשאה ברמת פעולה", "BOLA — כשל בהרשאה ברמת אובייקט", "BOPLA — כשל בהרשאה ברמת שדה", "XSS — הזרקת סקריפט"], explanation: "הפעולה המוגנת עצמה נגישה לתפקיד לא מורשה, ולכן מדובר בכשל בהרשאה ברמת פונקציה." },
  },

  // LEVEL 3 — Engineer
  {
    id: "l3-304", level: 3, topic: "API", trace: "GET /catalog   If-None-Match: \"abc\"", correct: 1,
    en: { prompt: "The stored ETag still matches. Which response means the client can reuse its cached representation?", options: ["206 Partial Content", "304 Not Modified", "412 Precondition Failed", "409 Conflict"], explanation: "304 Not Modified is used for conditional reads where the representation has not changed." },
    he: { prompt: "ה־ETag של הלקוח עדיין תואם לגרסה הנוכחית. איזו תגובה מאפשרת להשתמש בעותק השמור?", options: ["206 Partial Content", "304 Not Modified", "412 Precondition Failed", "409 Conflict"], explanation: "304 Not Modified מתאים לקריאה מותנית שבה הייצוג המבוקש לא השתנה." },
  },
  {
    id: "l3-bopla", level: 3, topic: "SECURITY", trace: 'PATCH /me {"displayName":"A", "role":"admin"}', correct: 3,
    en: { prompt: "The server accepts the self-service update and changes the role field. Which protection is missing?", options: ["Rate limiting on the login endpoint", "Object ownership checks only", "A stronger password policy", "Server-side property-level authorization"], explanation: "The server must restrict updates to sensitive properties. This is a BOPLA / mass-assignment-style authorization risk." },
    he: { prompt: "עדכון פרופיל עצמי משנה גם את שדה ההרשאות. מה חסר בשרת?", options: ["הגבלת קצב בדף ההתחברות", "בדיקת בעלות על האובייקט בלבד", "מדיניות סיסמאות מחמירה יותר", "הרשאה ברמת השדה הרגיש"], explanation: "השרת צריך להגביל כתיבה לשדות רגישים. מדובר בכשל אפשרי ברמת BOPLA / Mass Assignment." },
  },
  {
    id: "l3-parallel", level: 3, topic: "AUTOMATION", trace: "pytest -n 4  →  shared test account modified", correct: 0,
    en: { prompt: "Four workers update the same test user. Failures depend on timing. What should change first?", options: ["Give each worker isolated users and deterministic cleanup", "Increase every wait by five seconds", "Use session-scoped mutable state for all workers", "Turn assertions into warnings"], explanation: "Parallel tests need isolated mutable state. Longer waits do not eliminate the race over shared test data." },
    he: { prompt: "ארבעה Workers משנים אותו משתמש בדיקה. הכישלונות תלויים בתזמון. מה לתקן קודם?", options: ["לתת לכל Worker נתונים עצמאיים וניקוי מוגדר", "להאריך כל המתנה בחמש שניות", "לשתף מצב משתנה ב־Fixture לכל ה־Workers", "להפוך Assertions לאזהרות"], explanation: "הרצה מקבילית דורשת בידוד של נתונים משתנים. המתנות ארוכות אינן מתקנות את ההתנגשות." },
  },
  {
    id: "l3-state", level: 3, topic: "TEST DESIGN", trace: "ACTIVE → 5 failures → LOCKED → cooldown → ACTIVE", correct: 2,
    en: { prompt: "Which model best covers permitted and forbidden login operations across these states?", options: ["Only equivalence partitioning of passwords", "A screenshot comparison for each page", "State transition testing with events and expected states", "Only performance testing at peak load"], explanation: "A state-transition model captures transitions, triggering events, and actions allowed in each state." },
    he: { prompt: "איזה מודל יכסה פעולות מותרות ואסורות לאורך מצבי החשבון?", options: ["חלוקת סיסמאות לקבוצות שקילות בלבד", "השוואת צילום מסך בכל עמוד", "בדיקות מעברי מצב עם אירועים ותוצאות צפויות", "בדיקות עומס בלבד"], explanation: "מודל מעבר מצבים מאפשר לבדוק אירועים, מעבר בין מצבים ופעולות המותרות בכל מצב." },
  },
  {
    id: "l3-eventual", level: 3, topic: "RELIABILITY", trace: "POST /resource → 201; GET → 404 for ~300 ms", correct: 1,
    en: { prompt: "The contract documents eventual consistency within 2 seconds. How should a test verify creation?", options: ["Accept a permanent 404 as PASS", "Poll for the expected state with a strict deadline", "Sleep for 30 seconds and never inspect state", "Retry POST with a new resource ID each time"], explanation: "Bounded polling accounts for documented propagation delay while still failing if the state never becomes visible." },
    he: { prompt: "החוזה מתיר עקביות מאוחרת עד שתי שניות. איך לאמת יצירה?", options: ["לקבל 404 קבוע כהצלחה", "לבצע Polling למצב הנכון עד מגבלת זמן מוגדרת", "להמתין 30 שניות בלי לבדוק מצב", "לשלוח POST שוב עם מזהה חדש בכל פעם"], explanation: "Polling עם מגבלת זמן מכבד עיכוב מתועד בלי להסתיר כישלון קבוע." },
  },
  {
    id: "l3-contract", level: 3, topic: "API", trace: 'GET /users/7 → 200 {"id":7,"email":null}', correct: 3,
    en: { prompt: "The API contract requires email to be a non-null string. The status is 200. What should the contract test do?", options: ["PASS because 200 proves the contract", "Skip because the API returned JSON", "Only verify that the response arrived quickly", "FAIL because the response shape violates the contract"], explanation: "HTTP success does not imply payload correctness. Validate schemas and field constraints independently." },
    he: { prompt: "חוזה ה־API מחייב email כמחרוזת לא ריקה, אך התקבל null עם 200. מה התוצאה?", options: ["PASS כי 200 מוכיח תקינות", "SKIP כי התקבל JSON", "לבדוק רק את זמן התגובה", "FAIL כי מבנה התגובה מפר את החוזה"], explanation: "קוד 200 לא מוכיח תקינות נתונים. יש לבדוק בנפרד מבנה, טיפוסים ואילוצים של שדות." },
  },
  {
    id: "l3-sql", level: 3, topic: "TEST DESIGN", trace: "users LEFT JOIN orders ON users.id = orders.user_id", correct: 0,
    en: { prompt: "What happens to users who have no matching orders in this LEFT JOIN?", options: ["They remain in the result with NULL order columns", "They are excluded automatically", "They appear once for every order in the database", "They cause the query to fail"], explanation: "A LEFT JOIN preserves rows from the left table, with NULL values on the right where there is no match." },
    he: { prompt: "מה קורה למשתמשים שאין להם הזמנות תואמות ב־LEFT JOIN הזה?", options: ["הם נשארים בתוצאה עם NULL בעמודות ההזמנה", "הם מוסרים מהתוצאה אוטומטית", "כל משתמש מופיע כמספר כלל ההזמנות", "השאילתה נכשלת"], explanation: "LEFT JOIN משמר שורות מהטבלה השמאלית ומחזיר NULL לעמודות מהטבלה הימנית ללא התאמה." },
  },

  // LEVEL 4 — Senior
  {
    id: "l4-gateway", level: 4, topic: "INFRASTRUCTURE", trace: "gateway → upstream service timed out → 504", correct: 2,
    en: { prompt: "The gateway returned 504 but the upstream may have processed a write. What is the first sound investigation?", options: ["Treat every 504 as proof that the write was rolled back", "Increase the browser's animation duration", "Correlate request logs and check the transaction outcome before retrying", "Convert the response to 200 in the frontend"], explanation: "504 says the gateway did not receive a timely response. It does not establish whether the upstream write committed." },
    he: { prompt: "Gateway החזיר 504, אבל ייתכן שהשירות הפנימי ביצע כתיבה. מה לבדוק קודם?", options: ["להניח שכל 504 מוכיח Rollback", "להאריך את האנימציה בדפדפן", "להצליב לוגים ולברר את תוצאת הטרנזקציה לפני Retry", "להציג 200 בצד הלקוח"], explanation: "504 מציין שה־Gateway לא קיבל תשובה בזמן. הוא לא מוכיח אם הכתיבה בוצעה." },
  },
  {
    id: "l4-tenant", level: 4, topic: "SECURITY", trace: "Tenant A token → GET /tenant/B/projects → 200", correct: 0,
    en: { prompt: "The endpoint requires a valid token, but allows cross-tenant reads. What is the key regression assertion?", options: ["A must be denied access to B's projects despite valid authentication", "The UI should hide B's menu item", "The project ID must be longer than ten characters", "The token must expire sooner"], explanation: "Authentication alone is insufficient: object/tenant authorization must be enforced server-side on each request." },
    he: { prompt: "הנתיב דורש טוקן, אך מאפשר קריאה בין ארגונים. מה לבדוק ברגרסיה?", options: ["ש־A אינו יכול לגשת לפרויקטים של B גם עם אימות תקף", "שהממשק מסתיר את התפריט של B", "שמזהה הפרויקט ארוך מעשרה תווים", "שהטוקן פג מוקדם יותר"], explanation: "אימות זהות אינו מספיק; צריך אכיפת הרשאות לאובייקט ולארגון בכל בקשה." },
  },
  {
    id: "l4-xfail", level: 4, topic: "AUTOMATION", trace: "known defect: test currently fails by design", correct: 1,
    en: { prompt: "You want CI to track a known failing scenario without hiding an unexpected pass. Which pytest approach fits?", options: ["@pytest.mark.skip for all future runs", "@pytest.mark.xfail(strict=True) with an issue reference", "Remove all assertions from the test", "Catch every exception and return PASS"], explanation: "Strict xfail records the expected failure and treats an unexpected pass (XPASS) as a failure that warrants investigation." },
    he: { prompt: "צריך לעקוב ב־CI אחרי באג ידוע וגם לגלות אם הבדיקה פתאום עוברת. מה מתאים?", options: ["לסמן skip לנצח", "לסמן xfail(strict=True) עם הפניה לבאג", "להסיר את כל ה־Assertions", "לתפוס כל חריגה ולסמן PASS"], explanation: "Strict xfail מתעד כישלון צפוי ומזהה גם XPASS בלתי צפוי, שדורש בדיקה." },
  },
  {
    id: "l4-stock", level: 4, topic: "TEST DESIGN", trace: "stock=1; two concurrent POST /checkout → two successes", correct: 3,
    en: { prompt: "Which test best exposes the inventory race, rather than merely retesting sequential checkout?", options: ["Run one checkout twice, five minutes apart", "Check that both buttons use the same color", "Submit a single request with a large timeout", "Synchronize two parallel purchase attempts and assert one reservation succeeds"], explanation: "The defect depends on concurrency. A synchronized parallel test can expose a non-atomic reservation." },
    he: { prompt: "איזו בדיקה תחשוף Race Condition במלאי, ולא רק תהליך רכישה רגיל?", options: ["לבצע רכישה פעמיים בהפרש חמש דקות", "לוודא ששני כפתורים באותו צבע", "לשלוח בקשה יחידה עם Timeout ארוך", "לשלוח שתי רכישות במקביל ולוודא שרק הזמנה אחת מקבלת את הפריט"], explanation: "כיוון שהתקלה תלויה במקביליות, יש לבדוק שתי פעולות מתחרות ולאמת שמירת מלאי אטומית." },
  },
  {
    id: "l4-etag", level: 4, topic: "RELIABILITY", trace: 'PATCH /profile  If-Match: "v4"  // current ETag = "v5"', correct: 2,
    en: { prompt: "The update uses a stale If-Match ETag. Which response indicates the precondition failed?", options: ["304 Not Modified", "202 Accepted", "412 Precondition Failed", "206 Partial Content"], explanation: "For a failed If-Match condition on a write, 412 Precondition Failed prevents overwriting changes made by another actor." },
    he: { prompt: "עדכון משתמש ב־If-Match ישן. איזה קוד מציין שהתנאי המוקדם נכשל?", options: ["304 Not Modified", "202 Accepted", "412 Precondition Failed", "206 Partial Content"], explanation: "412 מתאים לכישלון תנאי If-Match ומאפשר למנוע דריסה של עדכון שבוצע בינתיים." },
  },
  {
    id: "l4-503504", level: 4, topic: "INFRASTRUCTURE", trace: "service overloaded vs upstream timed out", correct: 0,
    en: { prompt: "Which distinction between HTTP 503 and 504 is most accurate?", options: ["503 indicates the service is unavailable; 504 indicates a gateway timed out waiting for upstream", "503 always means bad credentials; 504 means insufficient permissions", "503 proves the database committed; 504 proves it rolled back", "Both always mean invalid JSON from the client"], explanation: "503 is service unavailability. 504 specifically denotes a gateway/proxy timeout when waiting for upstream." },
    he: { prompt: "איזו הבחנה בין 503 ל־504 היא המדויקת ביותר?", options: ["503 מציין שירות לא זמין; 504 מציין Timeout של Gateway מול שירות פנימי", "503 תמיד מציין בעיית אימות; 504 בעיית הרשאה", "503 מוכיח Commit; 504 מוכיח Rollback", "שניהם תמיד מציינים JSON לא תקין"], explanation: "503 עוסק באי־זמינות השירות, ואילו 504 הוא Timeout של Gateway או Proxy מול שירות במעלה השרשרת." },
  },
  {
    id: "l4-trace", level: 4, topic: "API", trace: "request-id=a1 → gateway → service B → DB", correct: 1,
    en: { prompt: "A write intermittently returns 500. What improves cross-service root-cause analysis?", options: ["Remove timestamps from logs", "Propagate a correlation/trace ID and inspect linked spans", "Restart the browser after every request", "Disable application error logging"], explanation: "A propagated correlation ID and distributed traces link one request across components and reveal where it failed." },
    he: { prompt: "כתיבה מחזירה מדי פעם 500. מה יעזור לאתר את מקור התקלה בין שירותים?", options: ["למחוק חותמות זמן מהלוגים", "להעביר Trace ID בין שירותים ולחקור את הרצף", "לאתחל דפדפן אחרי כל בקשה", "לבטל לוגים של שגיאות"], explanation: "מזהה מעקב שמועבר בין שירותים מאפשר לשייך לוגים ו־Spans של אותה בקשה ולאתר את נקודת הכשל." },
  },

  // LEVEL 5 — Expert
  {
    id: "l5-idempotent", level: 5, topic: "RELIABILITY", trace: "POST /transfer → timeout → retry → duplicate debit", correct: 1,
    en: { prompt: "For a non-idempotent transfer, which design prevents a timeout retry from causing a second debit?", options: ["Use a unique request ID only in the browser console", "Enforce a durable idempotency key for the logical transfer server-side", "Always retry POST with a newly generated transfer ID", "Disable TLS renegotiation in the client"], explanation: "The server must bind retries to the same logical operation and return the stored outcome, not execute a second financial write." },
    he: { prompt: "העברה כספית חוזרת אחרי Timeout וגורמת לחיוב כפול. מה ימנע זאת?", options: ["להוסיף Request ID רק ללוג בדפדפן", "לאכוף Idempotency Key עקבי לאותה העברה בצד השרת", "ליצור מזהה העברה חדש בכל Retry", "לשנות את הגדרות TLS בדפדפן"], explanation: "השרת חייב לזהות ניסיונות חוזרים של אותה פעולה ולחזור לתוצאה השמורה, בלי חיוב נוסף." },
  },
  {
    id: "l5-field", level: 5, topic: "SECURITY", trace: 'PATCH /accounts/9 {"limit": 999999}', correct: 2,
    en: { prompt: "A user owns the account but can change a server-controlled credit limit. Which test most directly isolates the failure?", options: ["Verify the account ID is UUID-formatted", "Send the same payload with a slower network", "Authenticate as the owner and assert the privileged property write is rejected", "Change CORS settings and retry"], explanation: "Ownership is not permission to change every property. A property-level authorization negative test isolates the BOPLA defect." },
    he: { prompt: "משתמש הוא בעל החשבון, אך מצליח לשנות מסגרת אשראי שנשלטת בשרת. איזו בדיקה ממוקדת?", options: ["לבדוק שמזהה החשבון הוא UUID", "לשלוח את אותו Payload ברשת איטית", "להתחבר כבעלים ולוודא שעדכון השדה המוגן נדחה", "לשנות הגדרות CORS ולנסות שוב"], explanation: "בעלות על אובייקט אינה הרשאה לשנות כל שדה. בדיקה שלילית ברמת השדה חושפת BOPLA." },
  },
  {
    id: "l5-parallel", level: 5, topic: "AUTOMATION", trace: "parallel suite: order-specific tests contaminate shared DB", correct: 0,
    en: { prompt: "Which architecture best supports reproducible parallel QA with stateful API tests?", options: ["Isolated test data per worker, deterministic cleanup, and explicit state assertions", "One shared admin account and global mutable fixtures", "A single fixed sleep between every test", "Retry all failing tests without preserving their failures"], explanation: "Independent data, cleanup and observable state assertions make parallel tests reproducible and failures diagnosable." },
    he: { prompt: "איזו ארכיטקטורה מתאימה להרצה מקבילית אמינה של בדיקות API עם שינוי מצב?", options: ["נתונים מבודדים לכל Worker, ניקוי מוגדר ואימות מצבים", "חשבון Admin משותף ו־Fixtures משתנים גלובליים", "Sleep אחיד בין כל הבדיקות", "Retry לכל כישלון בלי לשמור את ממצאי התקלה"], explanation: "בידוד נתונים, ניקוי ואימות מצב מפורש מאפשרים הרצות חוזרות ומקביליות עם אבחון מדויק." },
  },
  {
    id: "l5-risk", level: 5, topic: "TEST DESIGN", trace: "release today: payments critical, UI labels cosmetic", correct: 3,
    en: { prompt: "Time is limited before release. Which risk-based plan has the strongest rationale?", options: ["Retest every cosmetic label before any payment flow", "Choose tests only by how quickly they can be automated", "Run random exploratory checks and omit known high-impact paths", "Prioritize payment correctness, duplicate charges, authorization, then lower-impact UI"], explanation: "Risk-based testing prioritizes likelihood and business impact: irreversible financial and authorization defects outrank cosmetic defects." },
    he: { prompt: "נותר מעט זמן לפני שחרור. איזו תוכנית מבוססת סיכונים נכונה יותר?", options: ["לבדוק שוב כל תווית לפני תשלומים", "לבחור רק בדיקות שקל לכתוב להן אוטומציה", "לבצע חקר אקראי ולדלג על תהליכים קריטיים", "לתעדף תשלום תקין, מניעת חיוב כפול והרשאות לפני בעיות עיצוב קלות"], explanation: "בדיקות מבוססות סיכונים מתעדפות הסתברות והשפעה עסקית: תשלומים והרשאות קודמים לפגמי עיצוב קלים." },
  },
  {
    id: "l5-atomic", level: 5, topic: "RELIABILITY", trace: "balance=100; two concurrent withdrawals of 80", correct: 1,
    en: { prompt: "Two withdrawals race against the same balance. Which server-side rule best prevents overspending?", options: ["Check the balance in the browser before sending", "Use an atomic conditional balance update or transaction with concurrency control", "Wait 500 ms between user clicks", "Return 200 to both requests and reconcile later without limits"], explanation: "The balance check and update must be atomic (or transactionally protected), so only valid concurrent state transitions commit." },
    he: { prompt: "שתי משיכות של 80 מתחרות על יתרה של 100. מה ימנע משיכת יתר?", options: ["לבדוק יתרה בדפדפן לפני שליחה", "לבצע עדכון יתרה אטומי מותנה או טרנזקציה עם בקרת מקביליות", "להמתין 500 אלפיות השנייה בין לחיצות", "להחזיר 200 לשתי הבקשות ולטפל בזה ללא הגבלה בהמשך"], explanation: "בדיקת היתרה ועדכונה חייבות להתבצע באופן אטומי או תחת בקרת טרנזקציות, כך שרק מעברים תקינים יישמרו." },
  },
  {
    id: "l5-request-id", level: 5, topic: "INFRASTRUCTURE", trace: "X-Request-ID: abc  ≠  Idempotency-Key: xyz", correct: 2,
    en: { prompt: "What is the key distinction between a correlation ID and an idempotency key?", options: ["Both independently guarantee exactly-once execution", "Correlation IDs stop writes; idempotency keys are only for logging", "Correlation IDs trace requests; server-enforced idempotency keys deduplicate logical operations", "Both are mandatory HTTP standard headers for all APIs"], explanation: "A request/correlation ID aids observability. An idempotency key must be enforced by the server to prevent repeated execution." },
    he: { prompt: "מה ההבדל המרכזי בין Correlation ID לבין Idempotency Key?", options: ["שניהם לבדם מבטיחים Exactly Once", "Correlation ID עוצר כתיבות ו־Idempotency משמש רק ללוגים", "Correlation ID עוזר למעקב; Idempotency Key שנאכף בשרת מונע ביצוע כפול", "שניהם כותרות חובה בכל HTTP API"], explanation: "מזהה בקשה נועד לניטור ואיתור תקלות. מפתח Idempotency דורש אכיפה בשרת כדי למנוע פעולה כפולה." },
  },
  {
    id: "l5-contract", level: 5, topic: "API", trace: "POST /checkout → 200; order exists but total is wrong", correct: 0,
    en: { prompt: "The checkout returned HTTP 200 and created an order with an incorrect total. What is the most important missing assertion?", options: ["Verify persisted business invariants and totals, not only response codes", "Only validate that the endpoint responds within 1 second", "Treat 200 as complete proof of correctness", "Replace all API assertions with UI screenshots"], explanation: "A successful status can coexist with a severe data-integrity defect. Assertions must cover business invariants and persisted state." },
    he: { prompt: "Checkout החזיר 200 ויצר הזמנה בסכום שגוי. איזה Assertion חסר באופן משמעותי?", options: ["לאמת גם חוקים עסקיים וסכומים שנשמרו, ולא רק קודי תגובה", "לבדוק רק שזמן התגובה קצר משנייה", "להתייחס ל־200 כהוכחת תקינות מלאה", "להחליף את כל בדיקות ה־API בצילומי מסך"], explanation: "קוד הצלחה יכול להופיע לצד שגיאת נתונים חמורה. יש לאמת כללים עסקיים ומצב שנשמר בפועל." },
  },
];

const BOSSES: Scenario[] = [
  {
    id: "boss-payment", level: 5, topic: "RELIABILITY", trace: "POST /pay  →  504  →  retry  →  duplicate charge", correct: 2,
    en: { prompt: "The user timed out during payment; transaction state is unknown. Which complete recovery plan is safest?", options: ["Immediately submit a brand-new charge and trust the UI to deduplicate", "Assume the original write rolled back because the gateway timed out", "Reconcile transaction state, reuse a server-enforced idempotency key, and test parallel retries", "Extend the frontend timeout and skip backend verification"], explanation: "A gateway timeout does not imply payment failure. Reconcile persisted state, enforce idempotency, and exercise duplicate/concurrent attempts." },
    he: { prompt: "תשלום הסתיים ב־Timeout ולא ידוע אם בוצע. איזו תוכנית התאוששות בטוחה יותר?", options: ["לשלוח מיד חיוב חדש ולסמוך על הממשק", "להניח שהיה Rollback כי התקבל 504", "לבדוק מצב עסקה, להשתמש באותו Idempotency Key שנאכף בשרת ולבדוק Retry מקבילי", "להאריך Timeout בדפדפן ולדלג על אימות שרת"], explanation: "Timeout לא מוכיח כישלון חיוב. צריך לברר מצב, למנוע כפילות בשרת ולבדוק גם ניסיונות חוזרים מקבילים." },
  },
  {
    id: "boss-bola", level: 5, topic: "SECURITY", trace: "GET /teams/B/invoices → 200 for user from Team A", correct: 1,
    en: { prompt: "You found a cross-team invoice leak. What set of tests most credibly verifies the fix?", options: ["Hide invoice links and check that the page layout still matches", "Test allowed owner access, denied cross-team access, and direct API requests with valid foreign tokens", "Require invoice identifiers to be random but do not check authorization", "Confirm every user can retrieve any invoice after login"], explanation: "Authorization must be checked per object at the API boundary, for both permitted and forbidden identities." },
    he: { prompt: "מצאת דליפת חשבוניות בין צוותים. אילו בדיקות יוכיחו שהתיקון יעיל?", options: ["להסתיר קישורים ולבדוק את עיצוב הדף", "לבדוק גישה מותרת של בעלים, חסימת צוות אחר ובקשות API ישירות עם טוקן זר תקף", "לדרוש מזהים אקראיים בלי לבדוק הרשאות", "לוודא שכל משתמש מחובר יכול לשלוף כל חשבונית"], explanation: "צריך לבדוק הרשאות ברמת האובייקט בגבול ה־API, גם לגישה מותרת וגם לגישה אסורה." },
  },
  {
    id: "boss-stock", level: 5, topic: "RELIABILITY", trace: "inventory=1 → 2 buyers → both charged → stock=-1", correct: 3,
    en: { prompt: "Two checkouts race for the last item. Which solution addresses the bug at its source and proves it?", options: ["Disable the Buy button after the first browser click", "Increase API timeout and retry both requests", "Refresh the product page after checkout", "Use atomic reservation and a parallel test asserting only one successful reservation"], explanation: "Server-side concurrency control protects the shared resource; a synchronized two-request test exposes the original race." },
    he: { prompt: "שני קונים מתחרים על הפריט האחרון ושניהם חויבו. מה הפתרון והבדיקה הנכונים?", options: ["לחסום את כפתור הקנייה לאחר לחיצה בדפדפן הראשון", "להאריך Timeout ולעשות Retry לשתי הבקשות", "לרענן את דף המוצר לאחר הרכישה", "לממש שמירת מלאי אטומית ולבדוק במקביל שרק אחת מצליחה"], explanation: "בקרת מקביליות בשרת מגנה על המלאי המשותף. בדיקה מקבילית מדמה את התנאי שגרם לתקלה." },
  },
  {
    id: "boss-api", level: 5, topic: "API", trace: "POST /users=201 → GET=200 → DELETE=204 → GET=200", correct: 0,
    en: { prompt: "A CRUD lifecycle ends with GET still returning the deleted user. Which conclusion is best supported?", options: ["The delete response was successful, but the observable postcondition is wrong; investigate state/cache and fail the test", "All CRUD checks passed because each write got a 2xx", "It is safe to issue repeated DELETE requests without inspecting state", "The last GET proves that creation failed"], explanation: "204 alone does not establish the postcondition. A post-delete GET returning data reveals a state, cache or deletion-contract discrepancy." },
    he: { prompt: "בסיום תהליך CRUD, בקשת GET עדיין מחזירה משתמש שנמחק. מה המסקנה המדויקת?", options: ["מחיקה החזירה הצלחה אך מצב המערכת הנצפה שגוי; יש לחקור ולסמן כישלון", "הכול עבר כי פעולות הכתיבה החזירו 2xx", "כדאי לשלוח DELETE שוב ושוב בלי לבדוק מצב", "ה־GET האחרון מוכיח שהיצירה נכשלה"], explanation: "204 לא מוכיח לבדו את תנאי הסיום. GET אחרי מחיקה שחוזר עם נתונים מחייב חקירת מצב או מטמון." },
  },
  {
    id: "boss-ci", level: 5, topic: "AUTOMATION", trace: "CI: 4 workers  → flaky tests, user data collisions", correct: 2,
    en: { prompt: "CI passed locally but intermittently fails in parallel. What is the most effective investigation and hardening plan?", options: ["Double all timeouts and ignore failures that disappear on retry", "Force tests into one order and share an admin account", "Identify shared mutable resources, isolate fixtures, capture failure evidence, and add deterministic cleanup", "Turn off assertions that refer to backend state"], explanation: "Data races and shared state require isolation and cleanup. Logs, traces and artifacts help prove the root cause." },
    he: { prompt: "CI נכשל לסירוגין בהרצה מקבילית, אבל מקומית הכול עובר. איזו תוכנית עדיפה?", options: ["להכפיל Timeouts ולהתעלם מכישלונות שנעלמים ב־Retry", "לחייב סדר בדיקות ולשתף חשבון מנהל", "לאתר נתונים משותפים, לבודד Fixtures, לשמור ראיות ולנקות נתונים בצורה מוגדרת", "לבטל Assertions שמאמתים מצב שרת"], explanation: "התנגשויות בנתונים משותפים דורשות בידוד וניקוי, ותיעוד הרצה מסייע להבין את מקור הכשל." },
  },
  {
    id: "boss-security", level: 5, topic: "SECURITY", trace: 'PATCH /accounts/7 {"ownerId":8,"role":"admin"} → 200', correct: 3,
    en: { prompt: "A user can mutate another account's owner and role. Which test matrix best protects the API?", options: ["Test only correct JSON syntax and response time", "Test only that users can open their own profile", "Make user IDs less predictable and rely on obscurity", "Cover object ownership, property-level write permissions, and role-level function permissions"], explanation: "This combines object, property, and potentially function authorization risks; separate negative tests should enforce each boundary." },
    he: { prompt: "משתמש משנה בעלות והרשאות של חשבון אחר. איזו מטריצת בדיקות מגנה בצורה הטובה ביותר?", options: ["לבדוק רק JSON וזמן תגובה", "לבדוק רק פתיחת פרופיל עצמי", "להסתמך על מזהי משתמש אקראיים", "לכסות הרשאת אובייקט, הרשאת כתיבה לשדות והרשאות פעולה לפי תפקיד"], explanation: "התרחיש משלב כשלי הרשאה ברמת אובייקט, שדה ואולי פעולה. צריך לבדוק כל גבול בנפרד." },
  },
  {
    id: "boss-risk", level: 5, topic: "TEST DESIGN", trace: "release gate: payments, auth, carts, cosmetics", correct: 1,
    en: { prompt: "A production release has 30 minutes of QA left. What decision process best reduces residual risk?", options: ["Run only the easiest existing automated tests", "Cover highest-impact failure modes and unresolved blockers, document gaps and make an explicit release recommendation", "Execute tests strictly in alphabetical order", "Ignore failed security tests if cosmetic checks pass"], explanation: "Risk-based release decisions prioritize business impact, likelihood, known blockers and transparent communication of untested areas." },
    he: { prompt: "נותרו 30 דקות QA לפני שחרור. איזו שיטה מצמצמת סיכון בצורה הטובה ביותר?", options: ["להריץ רק בדיקות אוטומטיות קלות", "לכסות תקלות בעלות השפעה גבוהה וחסמי שחרור, לתעד פערים ולנסח המלצה", "להריץ בדיקות בסדר אלפביתי", "להתעלם מאבטחה אם בדיקות עיצוב עברו"], explanation: "החלטה מבוססת סיכונים מתמקדת בהשפעה, הסתברות, חסמי שחרור ופערי כיסוי שלא נבדקו." },
  },
  {
    id: "boss-observability", level: 5, topic: "INFRASTRUCTURE", trace: "gateway=504; service=200; DB write found; client retries", correct: 2,
    en: { prompt: "Distributed traces show a completed write even though the client saw 504. Which change and verification is most defensible?", options: ["Return 200 for every gateway error, regardless of outcome", "Disable logging so requests complete faster", "Preserve operation identity across retries, verify server-side deduplication, and test the unknown-outcome path", "Ask the user to click the button until they see success"], explanation: "An unknown client outcome requires a stable logical operation identity, server-enforced deduplication and verification through state/traces." },
    he: { prompt: "Tracing מראה כתיבה שהצליחה למרות שהלקוח קיבל 504. מה התיקון והבדיקה הנכונים?", options: ["להחזיר 200 על כל שגיאת Gateway בלי קשר לתוצאה", "לבטל לוגים כדי לזרז בקשות", "לשמר זהות פעולה בין ניסיונות, לאכוף Deduplication בשרת ולבדוק מסלול תוצאה לא ידועה", "לבקש מהמשתמש ללחוץ עד שרואים הצלחה"], explanation: "כשמצב הפעולה לא ידוע ללקוח, צריך לזהות את אותה פעולה לוגית ולמנוע ביצוע נוסף בשרת." },
  },
];

const ROUNDS = 6;
const BOSS_ROUND = 5;
const LEVELS = ["", "FOUNDATION", "ANALYST", "ENGINEER", "SENIOR", "EXPERT"];

function pickOne<T>(items: readonly T[]): T { return items[Math.floor(Math.random() * items.length)]; }
function getDifficulty(round: number, streak: number): Difficulty {
  // Advancing rounds increases the baseline. A streak of 2/4 correct answers
  // raises the tier faster; an error resets that bonus without ending the run.
  return Math.min(5, 1 + Math.floor(round / 2) + Math.min(2, Math.floor(streak / 2))) as Difficulty;
}
function nextScenario(round: number, streak: number, history: Scenario[]): Scenario {
  if (round === BOSS_ROUND) {
    return pickOne(BOSSES.filter((boss) => !history.some((past) => past.id === boss.id)));
  }
  const difficulty = getDifficulty(round, streak);
  const usedIds = new Set(history.map((s) => s.id));
  const usedTopics = new Set(history.map((s) => s.topic));
  // Try to avoid repeating a category within the five standard incidents.
  const inTier = QUESTIONS.filter((s) => s.level === difficulty && !usedIds.has(s.id));
  const newTopic = inTier.filter((s) => !usedTopics.has(s.topic));
  return pickOne(newTopic.length ? newTopic : inTier);
}
function getRank(points: number, correct: number, bossCorrect: boolean, he: boolean) {
  if (correct === 6 && bossCorrect) return { title: "MYTHIC", subtitle: he ? "שומר האיכות האגדי" : "QUALITY GUARDIAN", className: "mythic" };
  if (correct >= 5 && points >= 900) return { title: "LEGENDARY", subtitle: he ? "מגן הגרסה" : "RELEASE DEFENDER", className: "legend" };
  if (correct >= 4 && points >= 600) return { title: "MASTER", subtitle: he ? "חוקר תקלות בכיר" : "INCIDENT SPECIALIST", className: "master" };
  if (correct >= 3 && points >= 350) return { title: "PRO", subtitle: he ? "בודק מקצועי" : "QA PROFESSIONAL", className: "pro" };
  return { title: "ROOKIE", subtitle: he ? "יש עוד תקלות להציל" : "KEEP INVESTIGATING", className: "rookie" };
}
// Shared, intentionally simple SVG: the same mark in the header and footer.
export function ShieldIcon({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true">
      <path
        d="M8 17V11Q8 8 11 8H17 M31 8H37Q40 8 40 11V17 M40 31V37Q40 40 37 40H31 M17 40H11Q8 40 8 37V31"
        stroke="#E6C58E"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 12L33 16V24C33 30 29 34 24 37C19 34 15 30 15 24V16Z"
        stroke="white"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 24L22.6 27.3L28.7 20.8"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BrandMark() {
  const { language } = useLanguage();
  const lang: Language = language === "he" ? "he" : "en";
  const he = lang === "he";
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [history, setHistory] = useState<Scenario[]>([]);
  const [round, setRound] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [outcomes, setOutcomes] = useState<boolean[]>([]);
  const [earned, setEarned] = useState(0);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const firstAnswerRef = useRef<HTMLButtonElement>(null);
  const current = history[round];
  const boss = round === BOSS_ROUND;
  const difficulty = boss ? 5 : current?.level ?? 1;
  const rank = getRank(xp, correctCount, Boolean(outcomes[BOSS_ROUND]), he);

  const t = he ? {
    open: "פתיחת משחק QA", close: "סגירה", game: "משחקון QA", title: "RELEASE RESCUE", tagline: "אתה בתפקיד מהנדס האיכות. הגרסה בסכנה.",
    intro: "שישה אירועים. ארבע אפשרויות בכל החלטה. הרמה עולה עם ההתקדמות והרצף שלך.", mission: "המשימה שלך", start: "התחל משימה", time: "משחק קצר · ללא טיימר",
    round: "אירוע", boss: "BOSS ROUND", next: "לאירוע הבא", results: "לדרגת הסיום", replay: "משחק חדש",
    xp: "נקודות", streak: "רצף", difficulty: "רמה", correct: "איום נוטרל", wrong: "התקלה לא נפתרה", explanation: "ניתוח אירוע", finish: "MISSION COMPLETE",
    success: "תקלות שטופלו", best: "רצף מרבי", bossWin: "הבוס הוכרע", bossLoss: "הבוס נשאר פתוח", action: "בחר את התגובה המקצועית ביותר", more: "המשחק כולל תרחישים מתחלפים מתחומי API, אבטחה, תשתיות, אוטומציה ותכנון בדיקות.",
    ranks: ["יסודות", "אנליסט", "מהנדס", "בכיר", "מומחה"], badge: "משחק QA קצר", stars: "רמת הקושי משתנה לפי רצף התשובות",
  } : {
    open: "Play QA Release Rescue", close: "Close", game: "QA MINI GAME", title: "RELEASE RESCUE", tagline: "You're the quality engineer. Production is at risk.",
    intro: "Six incidents. Four choices each. Difficulty increases with progress and your streak.", mission: "YOUR MISSION", start: "START MISSION", time: "Short game · no timer",
    round: "INCIDENT", boss: "BOSS ROUND", next: "NEXT INCIDENT", results: "REVEAL RANK", replay: "PLAY AGAIN",
    xp: "XP", streak: "STREAK", difficulty: "LEVEL", correct: "THREAT NEUTRALIZED", wrong: "INCIDENT STILL OPEN", explanation: "INCIDENT ANALYSIS", finish: "MISSION COMPLETE",
    success: "Incidents resolved", best: "Best streak", bossWin: "Boss defeated", bossLoss: "Boss still active", action: "Choose the most defensible engineering response", more: "Rotating scenarios across APIs, security, infrastructure, automation and test design.",
    ranks: ["Foundation", "Analyst", "Engineer", "Senior", "Expert"], badge: "PLAYABLE QA CHALLENGE", stars: "Streaks increase the difficulty",
  };

  function openGame() { setOpen(true); setPhase("intro"); }
  function startGame() {
    setHistory([nextScenario(0, 0, [])]);
    setPhase("playing");
    setRound(0); setChoice(null); setXp(0); setStreak(0); setBestStreak(0); setCorrectCount(0); setOutcomes([]); setEarned(0);
  }
  function closeGame() { setOpen(false); triggerRef.current?.focus(); }
  function answer(index: number) {
    if (!current || choice !== null || phase !== "playing") return;
    const correct = index === current.correct;
    const newStreak = correct ? streak + 1 : 0;
    const awarded = correct ? (boss ? 400 : 100 + (current.level - 1) * 40) + Math.min(200, (newStreak - 1) * (boss ? 50 : 25)) : 0;
    setChoice(index);
    setEarned(awarded);
    setXp((n) => n + awarded);
    setStreak(newStreak);
    setBestStreak((n) => Math.max(n, newStreak));
    if (correct) setCorrectCount((n) => n + 1);
    setOutcomes((past) => [...past, correct]);
  }
  function goNext() {
    if (choice === null) return;
    modalRef.current?.scrollTo({ top: 0, behavior: "auto" });
    if (round === BOSS_ROUND) { setPhase("results"); return; }
    const nextRound = round + 1;
    const following = nextScenario(nextRound, streak, history);
    setHistory((past) => [...past, following]);
    setRound(nextRound);
    setChoice(null);
    setEarned(0);
  }

  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); triggerRef.current?.focus(); return; }
      if (event.key === "Tab") {
        const buttons = Array.from(modalRef.current?.querySelectorAll<HTMLButtonElement>("button:not([disabled])") ?? []);
        if (!buttons.length) return;
        const first = buttons[0]; const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = oldOverflow; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    if (phase === "intro") startRef.current?.focus();
    if (phase === "playing" && choice === null) firstAnswerRef.current?.focus();
  }, [open, phase, round, choice]);

  return (
    <>
      <button ref={triggerRef} type="button" className="qa-mark-trigger" onClick={openGame} aria-label={t.open} title={t.open}>
        <ShieldIcon size={31} />
        <span className="qa-mark-play" aria-hidden="true">▶</span>
      </button>

      {open && createPortal(
        <div className="qa-game-backdrop" onMouseDown={(event: { target: EventTarget | null; currentTarget: EventTarget | null }) => { if (event.target === event.currentTarget) closeGame(); }}>
          <div className="qa-game-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby={titleId} dir={he ? "rtl" : "ltr"}>
            <div className="qa-game-topline">
              <span className="qa-game-live"><span className="qa-game-live-dot" /> {t.game} <span aria-hidden="true">/</span> LIVE MISSION</span>
              <button ref={closeRef} type="button" className="qa-game-close" aria-label={t.close} onClick={closeGame}>×</button>
            </div>
            <div className="qa-game-banner">
              <div className="qa-game-banner-icon"><ShieldIcon size={39} /></div>
              <div>
                <div className="qa-game-banner-kicker">QUALITY ENGINEERING ARCADE</div>
                <h2 id={titleId} className="qa-game-title">{t.title}</h2>
                <p className="qa-game-tagline">{t.tagline}</p>
              </div>
              <span className="qa-game-banner-deco" aria-hidden="true">✦</span>
            </div>

            {phase === "intro" ? (
              <div className="qa-game-intro">
                <p className="qa-game-label">◈ {t.mission}</p>
                <p className="qa-game-intro-text">{t.intro}</p>
                <div className="qa-game-intro-grid">
                  <div><strong>05</strong><span>{he ? "אירועים" : "INCIDENTS"}</span></div>
                  <div><strong>01</strong><span>{he ? "בוס" : "FINAL BOSS"}</span></div>
                  <div><strong>04</strong><span>{he ? "בחירות" : "CHOICES"}</span></div>
                </div>
                <div className="qa-game-intro-foot"><span>⚡ {t.stars}</span><span>{t.time}</span></div>
                <button ref={startRef} className="qa-game-primary" type="button" onClick={startGame}><span aria-hidden="true">▶</span> {t.start}</button>
                <p className="qa-game-intro-note">{t.more}</p>
              </div>
            ) : (
              <>
                <div className="qa-game-hud" aria-label="Game status">
                  <div className="qa-game-hud-cell"><span>{t.xp}</span><strong>{xp.toLocaleString("en-US")}</strong></div>
                  <div className={`qa-game-hud-cell${streak >= 2 ? " streak-hot" : ""}`}><span>🔥 {t.streak}</span><strong>{streak}<small>x</small></strong></div>
                  <div className="qa-game-hud-cell"><span>{t.difficulty}</span><strong>{phase === "results" ? "★" : boss ? "BOSS" : `0${difficulty}`} </strong></div>
                </div>
                <div className="qa-game-track" aria-label={`${Math.min(round+1, ROUNDS)} / ${ROUNDS}`}>
                  {Array.from({ length: ROUNDS }, (_, i) => (
                    <div key={i} className={`qa-game-track-step${i === BOSS_ROUND ? " is-final" : ""}${i === round && phase === "playing" ? " is-active" : ""}${outcomes[i] === true ? " is-clear" : ""}${outcomes[i] === false ? " is-failed" : ""}`}>
                      <span aria-hidden="true">{i === BOSS_ROUND ? "♛" : i + 1}</span>
                    </div>
                  ))}
                </div>

                {phase === "playing" && current ? (
                  <div className="qa-game-round" key={current.id}>
                    <div className={`qa-game-stage${boss ? " is-boss" : ""}`}>
                      <div className="qa-game-stage-line">
                        <span className="qa-game-stage-label">{boss ? `♛ ${t.boss}` : `${t.round} 0${round + 1} · ${current.topic}`}</span>
                        <span className="qa-game-stage-tier">{boss ? "EXPERT+" : `${t.difficulty} ${difficulty}/5 · ${t.ranks[difficulty - 1]}`}</span>
                      </div>
                      <code className="qa-game-log" dir="ltr">{current.trace}</code>
                    </div>
                    <p className="qa-game-action">{t.action}</p>
                    <h3 className="qa-game-question">{current[lang].prompt}</h3>
                    <div className="qa-game-options">
                      {current[lang].options.map((option, index) => {
                        const revealed = choice !== null;
                        const correct = revealed && index === current.correct;
                        const wrong = revealed && choice === index && !correct;
                        return (
                          <button key={index} ref={index === 0 ? firstAnswerRef : undefined} type="button" disabled={revealed} onClick={() => answer(index)} className={`qa-game-option${correct ? " is-correct" : ""}${wrong ? " is-wrong" : ""}`}>
                            <span className="qa-game-option-key">{String.fromCharCode(65 + index)}</span>
                            <span className="qa-game-option-text">{option}</span>
                            {correct && <span className="qa-game-option-icon" aria-hidden="true">✓</span>}
                            {wrong && <span className="qa-game-option-icon" aria-hidden="true">✕</span>}
                          </button>
                        );
                      })}
                    </div>
                    {choice !== null && (
                      <div className={`qa-game-feedback${choice === current.correct ? " is-success" : " is-failure"}`} role="status">
                        <div className="qa-game-feedback-heading"><strong>{choice === current.correct ? `✓ ${t.correct}` : `✕ ${t.wrong}`}</strong><span>{earned ? `+${earned} XP` : "+0 XP"}</span></div>
                        <span className="qa-game-feedback-label">{t.explanation}</span>
                        <p>{current[lang].explanation}</p>
                        <button type="button" className="qa-game-primary" onClick={goNext}>{boss ? t.results : t.next} <span aria-hidden="true">{he ? "←" : "→"}</span></button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="qa-game-results" role="status">
                    <div className={`qa-game-trophy is-${rank.className}`} aria-hidden="true">✦</div>
                    <p className="qa-game-result-overline">{t.finish}</p>
                    <h3>{rank.title}</h3>
                    <p className="qa-game-rank-subtitle">{rank.subtitle}</p>
                    <div className="qa-game-final-xp">{xp.toLocaleString("en-US")} <small>XP</small></div>
                    <div className="qa-game-result-stats">
                      <div><strong>{correctCount}/6</strong><span>{t.success}</span></div>
                      <div><strong>{bestStreak}</strong><span>{t.best}</span></div>
                      <div><strong>{outcomes[BOSS_ROUND] ? "✓" : "—"}</strong><span>{outcomes[BOSS_ROUND] ? t.bossWin : t.bossLoss}</span></div>
                    </div>
                    <button type="button" className="qa-game-primary" onClick={startGame}><span aria-hidden="true">↻</span> {t.replay}</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>, document.body
      )}

      <style>{`
        .qa-mark-trigger{position:relative;width:39px;height:39px;flex-shrink:0;display:grid;place-items:center;border:0;border-radius:13px;cursor:pointer;background:linear-gradient(145deg,#35b6a7,#0b7770 54%,#19343d);box-shadow:0 8px 22px rgba(11,119,112,.23);transition:transform .18s ease,box-shadow .18s ease}
        .qa-mark-trigger:hover{transform:translateY(-2px) rotate(-4deg);box-shadow:0 11px 25px rgba(11,119,112,.32)}
        .qa-mark-play{position:absolute;bottom:-3px;inset-inline-end:-4px;display:grid;place-items:center;width:14px;height:14px;border-radius:50%;font-size:7px;color:#fff;background:#c49a50;border:2px solid #f5f7f3;box-sizing:border-box}
        .qa-mark-trigger:focus-visible,.qa-game-modal button:focus-visible{outline:3px solid #e6c58e;outline-offset:3px}
        .qa-game-backdrop{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:14px;background:rgba(7,22,28,.72);backdrop-filter:blur(11px)}
        .qa-game-modal{position:relative;width:min(100%,550px);max-height:calc(100dvh - 28px);overflow-y:auto;overscroll-behavior:contain;background:#f8faf5;border-radius:23px;border:1px solid #d7e5de;color:#1c3439;box-shadow:0 35px 110px rgba(3,22,25,.38);text-align:start}
        .qa-game-topline{height:36px;display:flex;align-items:center;justify-content:space-between;background:#102d34;color:#c6e4d8;padding:0 17px;font-size:10px;letter-spacing:.13em;font-weight:900}
        .qa-game-live{display:flex;gap:8px;align-items:center}.qa-game-live-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#7fe9ac;box-shadow:0 0 9px rgba(127,233,172,.7)}
        .qa-game-close{width:25px;height:25px;border:0;display:grid;place-items:center;cursor:pointer;font-size:21px;color:#e4eee9;border-radius:50%;background:rgba(255,255,255,.12)}
        .qa-game-banner{position:relative;display:flex;align-items:center;gap:15px;overflow:hidden;min-height:105px;padding:21px 24px;background:radial-gradient(circle at 90% 0%,rgba(33,135,121,.38),transparent 45%),linear-gradient(120deg,#143b40,#102930 75%);color:white}
        .qa-game-banner-icon{height:57px;width:57px;border-radius:16px;flex-shrink:0;background:linear-gradient(145deg,#2f9b8d,#0c6d65);display:grid;place-items:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}
        .qa-game-banner-kicker{font-size:10px;letter-spacing:.15em;color:#c3a376;font-weight:900;margin-bottom:5px}.qa-game-title{font-weight:900;font-size:23px;letter-spacing:.035em;line-height:1.1;margin:0}.qa-game-tagline{font-size:11px;color:#d3e7df;margin:6px 0 0;line-height:1.5}
        .qa-game-banner-deco{position:absolute;right:17px;top:7px;font-size:63px;opacity:.07;pointer-events:none}
        .qa-game-intro{padding:23px 25px 26px}.qa-game-label{font-size:10px;font-weight:900;letter-spacing:.12em;color:#0b7770;margin:0 0 8px}.qa-game-intro-text{font-size:14px;line-height:1.65;color:#385a57;margin:0 0 20px;font-weight:650}
        .qa-game-intro-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:0 0 17px}.qa-game-intro-grid>div{border:1px solid #dbe9e0;background:white;border-radius:12px;display:flex;flex-direction:column;align-items:center;padding:14px 4px;gap:4px}.qa-game-intro-grid strong{font-weight:900;font-size:24px;color:#0b7770;font-variant-numeric:tabular-nums}.qa-game-intro-grid span{font-size:10px;color:#788d85;font-weight:800;letter-spacing:.04em}
        .qa-game-intro-foot{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:11px;color:#6c8880;margin:0 0 19px}.qa-game-intro-note{text-align:center;font-size:11px;color:#789087;line-height:1.6;margin:12px 0 0}
        .qa-game-primary{width:100%;min-height:46px;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 16px;border:0;border-radius:11px;background:linear-gradient(115deg,#118477,#0a5e59);color:#fff;font-weight:850;font-size:13px;letter-spacing:.03em;cursor:pointer;box-shadow:0 9px 20px rgba(11,119,112,.16)}.qa-game-primary:hover{filter:brightness(1.07)}
        .qa-game-hud{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:17px 20px 12px}.qa-game-hud-cell{min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:11px;background:#ebf2ee;border:1px solid #d8e5dd;padding:10px 8px;gap:4px}.qa-game-hud-cell>span{font-size:10px;font-weight:800;letter-spacing:.04em;color:#71897f}.qa-game-hud-cell strong{font-size:20px;font-weight:900;color:#0b7770;font-variant-numeric:tabular-nums;line-height:1.1}.qa-game-hud-cell strong small{font-size:11px;margin-inline-start:2px}.qa-game-hud-cell.streak-hot{background:#fff3df;border-color:#e8cfa2}.qa-game-hud-cell.streak-hot strong{color:#ab6824}
        .qa-game-track{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;margin:0 20px 17px}.qa-game-track-step{display:grid;place-items:center;height:24px;border-radius:7px;background:#e4ebe6;color:#8ca29a;font-size:11px;font-weight:800}.qa-game-track-step.is-active{background:#0b7770;color:white;box-shadow:0 0 0 2px rgba(11,119,112,.14)}.qa-game-track-step.is-final{border:1px solid #e3c588}.qa-game-track-step.is-final.is-active{background:linear-gradient(125deg,#ab7b2c,#e3b963);color:#fff}.qa-game-track-step.is-clear{background:#d6efe2;color:#11775f}.qa-game-track-step.is-failed{background:#f8e3df;color:#b15a4d}
        .qa-game-round{padding:0 20px 20px}.qa-game-stage{border-radius:12px;border:1px solid #d7e6df;background:#eef6f1;padding:13px 15px;margin-bottom:15px}.qa-game-stage.is-boss{border-color:#dfc38d;background:linear-gradient(120deg,#fff5e1,#f9ead2)}.qa-game-stage-line{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:9px}.qa-game-stage-label{color:#0a7269;font-size:10px;font-weight:900;letter-spacing:.07em}.qa-game-stage.is-boss .qa-game-stage-label{color:#9e6d24}.qa-game-stage-tier{font-size:10px;font-weight:750;color:#7a9087;white-space:nowrap}
        .qa-game-log{display:block;direction:ltr;text-align:left;white-space:pre-wrap;overflow-wrap:anywhere;font:600 12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;color:#365853}.qa-game-action{margin:0 0 6px;font-size:10px;font-weight:900;color:#0b7770;text-transform:uppercase;letter-spacing:.03em}.qa-game-question{margin:0 0 14px;color:#19353b;font-size:15px;font-weight:800;line-height:1.52}
        .qa-game-options{display:grid;gap:8px}.qa-game-option{width:100%;display:flex;align-items:center;gap:10px;min-height:49px;padding:9px 11px;border-radius:11px;border:1px solid #dce9e2;background:white;cursor:pointer;text-align:start;color:#244741;line-height:1.45;font-size:12px;font-weight:650;transition:transform .15s,border-color .15s,background .15s}.qa-game-option:not(:disabled):hover{border-color:#26a593;background:#ecf9f4;transform:translateY(-1px)}.qa-game-option:disabled{cursor:default;opacity:.74}.qa-game-option.is-correct{border-color:#2f9d83;background:#e1f4e8;opacity:1}.qa-game-option.is-wrong{border-color:#d78273;background:#fceae6;opacity:1}
        .qa-game-option-key{flex-shrink:0;display:grid;place-items:center;width:27px;height:27px;border-radius:8px;background:#edf3ef;color:#587a70;font-weight:900;font-size:11px;direction:ltr}.qa-game-option-text{flex:1}.qa-game-option-icon{flex-shrink:0;font-weight:900;font-size:17px}
        .qa-game-feedback{padding:13px 14px;margin-top:13px;background:#f2f5f0;border:1px solid #dce8e2;border-radius:12px}.qa-game-feedback.is-success{background:#e5f4e9;border-color:#bde3ca}.qa-game-feedback.is-failure{background:#fcf0eb;border-color:#edcbbf}.qa-game-feedback-heading{display:flex;justify-content:space-between;align-items:center;gap:8px}.qa-game-feedback-heading strong{font-weight:900;font-size:12px;color:#0a7767}.qa-game-feedback.is-failure .qa-game-feedback-heading strong{color:#b45344}.qa-game-feedback-heading span{font-weight:900;color:#0a7767;font-size:12px}.qa-game-feedback-label{font-size:10px;color:#68867d;display:block;margin-top:9px;font-weight:800}.qa-game-feedback p{font-size:12px;line-height:1.55;color:#3e665e;margin:5px 0 14px}
        .qa-game-results{text-align:center;padding:7px 20px 24px}.qa-game-trophy{width:74px;height:74px;margin:10px auto 12px;display:grid;place-items:center;background:linear-gradient(145deg,#dfeee7,#86bba5);border-radius:22px;color:#fff;font-size:40px}.qa-game-trophy.is-mythic{background:linear-gradient(145deg,#c4a0e3,#7b69d4);box-shadow:0 10px 28px rgba(121,94,186,.28)}.qa-game-trophy.is-legend{background:linear-gradient(145deg,#edd49d,#bf8f3f)}.qa-game-trophy.is-master{background:linear-gradient(145deg,#91c6ce,#2a859c)}.qa-game-trophy.is-pro{background:linear-gradient(145deg,#7bbdad,#14746b)}.qa-game-result-overline{font-size:10px;letter-spacing:.15em;color:#768f85;font-weight:900}.qa-game-results h3{font-size:26px;color:#0b7770;margin:7px 0 2px;letter-spacing:.06em}.qa-game-rank-subtitle{font-size:12px;color:#728a81;margin:0 0 9px}.qa-game-final-xp{font-size:36px;font-weight:900;color:#123f40;font-variant-numeric:tabular-nums}.qa-game-final-xp small{font-size:13px;color:#8da69b}.qa-game-result-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:16px 0}.qa-game-result-stats>div{display:flex;flex-direction:column;gap:5px;background:#eaf3ee;border:1px solid #dceae2;border-radius:10px;padding:12px 5px}.qa-game-result-stats strong{font-size:17px;color:#0b7770}.qa-game-result-stats span{font-size:10px;color:#68867d}
        @media(max-width:520px){.qa-mark-trigger{width:34px;height:34px;border-radius:11px}.qa-game-backdrop{padding:9px}.qa-game-modal{max-height:calc(100dvh - 18px);border-radius:18px}.qa-game-banner{padding:15px;min-height:92px;gap:11px}.qa-game-banner-icon{height:47px;width:47px;border-radius:13px}.qa-game-title{font-size:20px}.qa-game-tagline{font-size:10px}.qa-game-banner-kicker{font-size:9px}.qa-game-hud{margin:13px 12px 9px;gap:6px}.qa-game-hud-cell{padding:8px 3px}.qa-game-hud-cell strong{font-size:17px}.qa-game-track{margin:0 12px 12px}.qa-game-round{padding:0 12px 13px}.qa-game-question{font-size:13px}.qa-game-option{font-size:12px;min-height:44px;padding:8px}.qa-game-intro{padding:17px 14px}.qa-game-intro-grid strong{font-size:21px}.qa-game-results{padding:4px 12px 14px}}
        @media(prefers-reduced-motion:reduce){.qa-mark-trigger,.qa-game-option{transition:none}}
      `}</style>
    </>
  );
}

/** Brand button (game) and the home link are separate interactive controls. */
export function InteractiveBrand() {
  const { language } = useLanguage();
  const lang = language === "he" ? "he" : "en";
  return (

<div
  className="brand"
  dir="ltr"
  style={{
    flexDirection: lang === "he" ? "row-reverse" : "row",
  }}
>
  <BrandMark />

  <Link
    href="/"
    className="brand-copy"
    aria-label={
      lang === "he"
        ? "קיריל קובלבסקי — לעמוד הבית"
        : "Kirill Kovalevski — Home"
    }
    style={{ textDecoration: "none" }}
  >
    <strong>
      {lang === "he" ? "קיריל קובלבסקי" : "Kirill Kovalevski"}
    </strong>

    <small>{translations[lang].navigation.tagline}</small>
  </Link>
</div>

  );
}