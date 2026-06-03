// ==========================================
//  DISCIPLINE TRACKER — App Logic
// ==========================================

(function () {
    'use strict';

    // ==========================================
    //  FIREBASE INITIALIZATION
    // ==========================================
    const firebaseConfig = {
        apiKey: "AIzaSyBvvhqj-qRSb8zbJIEmfdtlLeEf84EADME",
        authDomain: "discipline-tracker-c8431.firebaseapp.com",
        projectId: "discipline-tracker-c8431",
        storageBucket: "discipline-tracker-c8431.firebasestorage.app",
        messagingSenderId: "361871012973",
        appId: "1:361871012973:web:6c3a554435d53c6ef9bb64",
        measurementId: "G-6GJXD5RV8Y"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    let currentUser = null;

    // ==========================================
    //  DATA — Parsed from @thedisciplined_guyy
    // ==========================================
    const ALL_EPISODES = [
        // === FAT TO FIT SERIES ===
        { id: 'ftf-01', series: 'fattofit', day: 1, title: 'Fat to Fit Series Day 01', caption: 'Fat to fit series Day 01\n\n#transformation #growth #mindset #motivation #fatloss', url: 'https://www.instagram.com/p/DLMDtGrzd1y/', timestamp: '2025-06-22T03:45:56.000Z', commentsCount: 23, likesCount: 0 },
        { id: 'ftf-02', series: 'fattofit', day: 2, title: 'Fat to Fit Series Day 02', caption: 'Fat to fit series Day 02\n🎬\n\n#transformation #growth #mindset #motivation #fatloss', url: 'https://www.instagram.com/p/DLO-6FFT_8K/', timestamp: '2025-06-23T07:00:25.000Z', commentsCount: 11, likesCount: 0 },
        { id: 'ftf-03', series: 'fattofit', day: 3, title: 'Fat to Fit Series Day 03', caption: 'Day 03 Fat to Fit series\n\n#transformation #growth #mindset #motivation #fatloss', url: 'https://www.instagram.com/p/DLScaITTsVJ/', timestamp: '2025-06-24T17:17:02.000Z', commentsCount: 27, likesCount: 0 },
        { id: 'ftf-04', series: 'fattofit', day: 4, title: 'Fat to Fit Series Day 04', caption: 'Fat to fit Series - Day 04\n\n#transformation #growth #mindset #motivation #fatloss', url: 'https://www.instagram.com/p/DLVFWgfzBXL/', timestamp: '2025-06-25T15:50:00.000Z', commentsCount: 38, likesCount: 0 },
        { id: 'ftf-05', series: 'fattofit', day: 5, title: 'Fat to Fit Series Day 05', caption: 'Fat to Fit series Day 05\nA series of sharing my knowledge based on scientific research and years of experience — which will help you lose fat 🫡\n\n#Fatloss #motivation #growth #transformation', url: 'https://www.instagram.com/p/DLY5ZYFTxZk/', timestamp: '2025-06-27T03:25:19.000Z', commentsCount: 376, likesCount: 0 },
        { id: 'ftf-06', series: 'fattofit', day: 6, title: 'Fat to Fit Series Day 06', caption: 'Fat to Fit series Day 06 🫡\n\nA series of sharing my knowledge based on scientific research and years of experience — which will help you lose fat\n\n#Fatloss #motivation #growth #transformation', url: 'https://www.instagram.com/p/DLeD23LTZ8b/', timestamp: '2025-06-29T03:30:00.000Z', commentsCount: 26, likesCount: 0 },
        { id: 'ftf-07', series: 'fattofit', day: 7, title: 'Fat to Fit Series Day 07', caption: 'Fat to Fit Series Day 07\n\nA series of sharing scientific knowledge & experience — which will help you lose fat\n\nFor athletes wanting to preserve muscles while losing fat — the best thing to do is train their muscles the same way they used to train them while building muscles\n\nThen pair it with Low intensity cardio and a calorie deficit for optimal results\n\n#fatloss #motivation #growth #transformation', url: 'https://www.instagram.com/p/DLkfxpZTfQI/', timestamp: '2025-07-02T03:30:00.000Z', commentsCount: 17, likesCount: 0 },
        { id: 'ftf-08', series: 'fattofit', day: 8, title: 'Fat to Fit Series Day 08', caption: 'Fat to Fit Series Day 08\n\nA series of sharing my knowledge based on scientific research and years of experience — which will help you lose fat 🫡🔱\n\n#Fatloss #motivation #growth #transformation', url: 'https://www.instagram.com/p/DLoXB6CTVBg/', timestamp: '2025-07-03T03:30:00.000Z', commentsCount: 24, likesCount: 0 },
        { id: 'ftf-09', series: 'fattofit', day: 9, title: 'Fat to Fit Series Day 09', caption: 'Fat to Fit series Day 09\n\nAn initiative for healthy life — a series to help people lose extra fat the healthy and scientific way 🧪🧬\n\nI have been training for 9 years now and gone through phases of bulks and cuts\n\n#fatloss #transformation #growth #motivation', url: 'https://www.instagram.com/p/DLtS47jz6VZ/', timestamp: '2025-07-05T01:30:00.000Z', commentsCount: 49, likesCount: 0 },
        { id: 'ftf-10', series: 'fattofit', day: 10, title: 'Fat to Fit Series Day 10', caption: 'Ep 10 / Day 10 Fat to Fit Series\n\nA series of sharing knowledge + experiences to help you lose fat\n\nReasons for being skinny fat and losing muscle mass in fat loss journey\n\n#Fatloss #transformation #growth #motivation', url: 'https://www.instagram.com/p/DMCG6GOTZOY/', timestamp: '2025-07-13T03:30:00.000Z', commentsCount: 44, likesCount: 816 },
        { id: 'ftf-11', series: 'fattofit', day: 11, title: 'Fat to Fit Series Episode 11', caption: 'Fat to Fit Series Episode 11\nHow I make my diet plans for losing fat —\n\nA series of sharing knowledge based on scientific evidence and experience for helping you lose fat 🫡\n\n#Fatloss #transformation #motivation #growth', url: 'https://www.instagram.com/p/DMJniJYT5jR/', timestamp: '2025-07-16T01:30:00.000Z', commentsCount: 65, likesCount: 2024 },
        { id: 'ftf-12', series: 'fattofit', day: 12, title: 'Fat to Fit Series Episode 12', caption: 'Fat to fit series episode 12\nA series of sharing scientific knowledge plus experience to help you lose fat in a healthy and efficient way\n\nShare for letting others to know about the fat loss science and bursting their myths\n\n#FatLoss #fattoFitTransformation #Growth #Motivation', url: 'https://www.instagram.com/p/DM1n_6ITXY7/', timestamp: '2025-08-02T03:45:10.000Z', commentsCount: 10, likesCount: 957 },

        // === MUSCLE BUILDING / DISCIPLINE SERIES ===
        { id: 'mb-14', series: 'muscle', day: 14, title: 'Episode 14 — Muscle Building', caption: 'Episode 14\nSharing a decade of bodybuilding and fitness experience to help you build muscle more efficiently through science.\n\nControl negatives and perform movements within a controlled range of motion. This helps increase time under tension and minimizes joint stress.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DXcHW_FE6KV/', timestamp: '2026-04-22T15:40:49.000Z', commentsCount: 46, likesCount: 10259 },
        { id: 'mb-15', series: 'muscle', day: 15, title: 'Episode 15 — Muscle Building', caption: 'Episode 15\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\nControl negatives and perform movements within a controlled range of motion.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DXewgXxk3in/', timestamp: '2026-04-23T16:19:02.000Z', commentsCount: 54, likesCount: 5788 },
        { id: 'mb-16', series: 'muscle', day: 16, title: 'Episode 16 — Muscle Building', caption: 'Episode 16\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat efficiently through science.\n\nControl negatives and perform movements within a controlled range of motion.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DXhi7r1E120/', timestamp: '2026-04-24T18:17:47.000Z', commentsCount: 44, likesCount: 4082 },
        { id: 'mb-18', series: 'muscle', day: 18, title: 'Episode 18 — Muscle Building', caption: 'Episode 18\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\nControl negatives and perform movements within a controlled range of motion.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DXkC6bSTrq6/', timestamp: '2026-04-25T18:05:00.000Z', commentsCount: 20, likesCount: 3500 },
        { id: 'mb-19', series: 'muscle', day: 19, title: 'Episode 19 — Muscle Building', caption: 'Episode 19\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DXpGEqNE4MU/', timestamp: '2026-04-27T16:39:38.000Z', commentsCount: 30, likesCount: 4790 },
        { id: 'mb-20', series: 'muscle', day: 20, title: 'Episode 20 — Muscle Building', caption: 'Episode 20\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\nControl negatives and perform movements within a controlled range of motion.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DXrqIfeE4jp/', timestamp: '2026-04-28T16:41:52.000Z', commentsCount: 14, likesCount: 2353 },
        { id: 'mb-22', series: 'muscle', day: 22, title: 'Episode 22 — Muscle Building', caption: 'Episode 22\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DXw_7_SCASU/', timestamp: '2026-04-30T18:20:31.000Z', commentsCount: 23, likesCount: 4720 },
        { id: 'mb-23', series: 'muscle', day: 23, title: 'Episode 23 — Muscle Building', caption: 'Episode 23\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DXzg8VDzA49/', timestamp: '2026-05-01T17:48:24.000Z', commentsCount: 73, likesCount: 17988 },
        { id: 'mb-24', series: 'muscle', day: 24, title: 'Day 24 — Discipline Series', caption: 'Day 24: DISCIPLINE SERIES\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\nThe series is gonna cover every aspect of body transformation from mindset to diet and workout periodization and much more.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding', url: 'https://www.instagram.com/p/DX14iy4isP7/', timestamp: '2026-05-02T15:52:48.000Z', commentsCount: 33, likesCount: 3848 },
        { id: 'mb-26', series: 'muscle', day: 26, title: 'Episode 26 — Muscle Building', caption: 'Episode 26\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding', url: 'https://www.instagram.com/p/DX7MP_XT23I/', timestamp: '2026-05-04T17:20:01.000Z', commentsCount: 36, likesCount: 9753 },
        { id: 'mb-27', series: 'muscle', day: 27, title: 'Episode 27 — Muscle Building', caption: 'Episode 27\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DX9vq3STtH-/', timestamp: '2026-05-05T17:08:34.000Z', commentsCount: 22, likesCount: 4016 },
        { id: 'mb-29', series: 'muscle', day: 29, title: 'Episode 29 — Muscle Building', caption: 'Episode 29\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYCwiluyB6Z/', timestamp: '2026-05-07T15:50:00.000Z', commentsCount: 50, likesCount: 7838 },
        { id: 'mb-30', series: 'muscle', day: 30, title: 'Episode 30 — Muscle Building', caption: 'Episode 30\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYFT8gPzn2w/', timestamp: '2026-05-08T15:40:01.000Z', commentsCount: 68, likesCount: 12881 },
        { id: 'mb-31', series: 'muscle', day: 31, title: 'Episode 31 — Muscle Building', caption: 'Episode 31\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYIKtSDzzsR/', timestamp: '2026-05-09T18:17:13.000Z', commentsCount: 42, likesCount: 8294 },
        { id: 'mb-33', series: 'muscle', day: 33, title: 'Episode 33 — Muscle Building', caption: 'Episode 33\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYNgz-lzGdZ/', timestamp: '2026-05-11T20:05:47.000Z', commentsCount: 360, likesCount: 89905 },
        { id: 'mb-34', series: 'muscle', day: 34, title: 'Episode 34 — Muscle Building', caption: 'Episode 34\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYP595Ez33s/', timestamp: '2026-05-12T18:29:43.000Z', commentsCount: 1187, likesCount: 338511 },
        { id: 'mb-35', series: 'muscle', day: 35, title: 'Episode 35 — Muscle Building', caption: 'Episode 35\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYSfDXxzhGr/', timestamp: '2026-05-13T18:27:20.000Z', commentsCount: 309, likesCount: 50145 },
        { id: 'mb-36', series: 'muscle', day: 36, title: 'Episode 36 — Muscle Building', caption: 'Episode 36\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYVDw9xSDvO/', timestamp: '2026-05-14T18:25:00.000Z', commentsCount: 67, likesCount: 12973 },
        { id: 'mb-37', series: 'muscle', day: 37, title: 'Episode 37 — Muscle Building', caption: 'Episode 37\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYXomCFypVQ/', timestamp: '2026-05-15T18:25:00.000Z', commentsCount: 92, likesCount: 14093 },
        { id: 'mb-38', series: 'muscle', day: 38, title: 'Episode 38 — Muscle Building', caption: 'Episode 38\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYaOXHSTqVr/', timestamp: '2026-05-16T18:35:47.000Z', commentsCount: 736, likesCount: 132081 },
        { id: 'mb-39', series: 'muscle', day: 39, title: 'Episode 39 — Muscle Building', caption: 'Episode 39\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYctBuwSyIF/', timestamp: '2026-05-17T17:40:00.000Z', commentsCount: 55, likesCount: 6398 },
        { id: 'mb-40', series: 'muscle', day: 40, title: 'Episode 40 — Muscle Building', caption: 'Episode 40\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYfZF03zGrl/', timestamp: '2026-05-18T18:45:10.000Z', commentsCount: 79, likesCount: 15766 },
        { id: 'mb-41', series: 'muscle', day: 41, title: 'Episode 41 — Muscle Building', caption: 'Episode 41\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYhvev0zfUa/', timestamp: '2026-05-19T16:40:03.000Z', commentsCount: 65, likesCount: 5762 },
        { id: 'mb-42', series: 'muscle', day: 42, title: 'Episode 42 — Muscle Building', caption: 'Episode 42\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYkjZG0ThY4/', timestamp: '2026-05-20T18:51:23.000Z', commentsCount: 110, likesCount: 11408 },
        { id: 'mb-43', series: 'muscle', day: 43, title: 'Episode 43 — Muscle Building', caption: 'Episode 43\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYnIXPLTBgH/', timestamp: '2026-05-21T18:53:30.000Z', commentsCount: 51, likesCount: 7188 },
        { id: 'mb-44', series: 'muscle', day: 44, title: 'Episode 44 — Muscle Building', caption: 'Episode 44\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYpiYC_zfrd/', timestamp: '2026-05-22T17:18:42.000Z', commentsCount: 614, likesCount: 150332 },
        { id: 'mb-45', series: 'muscle', day: 45, title: 'Episode 45 — Muscle Building', caption: 'Episode 45\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYsGdmyzRYH/', timestamp: '2026-05-23T17:12:10.000Z', commentsCount: 212, likesCount: 32965 },
        { id: 'mb-46', series: 'muscle', day: 46, title: 'Episode 46 — Muscle Building', caption: 'Episode 46\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYuuwqUTWNR/', timestamp: '2026-05-24T17:45:53.000Z', commentsCount: 270, likesCount: 49397 },
        { id: 'mb-47', series: 'muscle', day: 47, title: 'Episode 47 — Muscle Building', caption: 'Episode 47\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYxaN3kz3wb/', timestamp: '2026-05-25T20:43:41.000Z', commentsCount: 37, likesCount: 6772 },
        { id: 'mb-48', series: 'muscle', day: 48, title: 'Episode 48 — Muscle Building', caption: 'Episode 48\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DYz7Mfdz6e2/', timestamp: '2026-05-26T18:19:10.000Z', commentsCount: 103, likesCount: 18771 },
        { id: 'mb-49', series: 'muscle', day: 49, title: 'Episode 49 — Muscle Building', caption: 'Episode 49\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DY2jcnvTbuY/', timestamp: '2026-05-27T18:37:50.000Z', commentsCount: 38, likesCount: 5995 },
        { id: 'mb-50', series: 'muscle', day: 50, title: 'Episode 50 — Muscle Building', caption: 'Episode 50\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DY5C4blyeux/', timestamp: '2026-05-28T17:50:11.000Z', commentsCount: 63, likesCount: 10000 },
        { id: 'mb-51', series: 'muscle', day: 51, title: 'Episode 51 — Muscle Building', caption: 'Episode 51\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DY7o7ZDzWYX/', timestamp: '2026-05-29T18:02:03.000Z', commentsCount: 43, likesCount: 4714 },
        { id: 'mb-52', series: 'muscle', day: 52, title: 'Episode 52 — Muscle Building', caption: 'Episode 52\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DY-ILmmzslg/', timestamp: '2026-05-30T17:13:25.000Z', commentsCount: 23, likesCount: 3252 },
        { id: 'mb-53', series: 'muscle', day: 53, title: 'Episode 53 — Muscle Building', caption: 'Episode 53\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DZA5tQLTwwY/', timestamp: '2026-05-31T19:09:43.000Z', commentsCount: 19, likesCount: 3144 },
        { id: 'mb-54', series: 'muscle', day: 54, title: 'Episode 54 — Muscle Building', caption: 'Episode 54\nSharing a decade of bodybuilding and fitness experience to help you build muscle & lose fat more efficiently through science.\n\n#Fitness #vascularity #musclegrowth #BodyBodybuilding #Growth', url: 'https://www.instagram.com/p/DZCeuzLT7J8/', timestamp: '2026-06-01T09:47:29.000Z', commentsCount: 12, likesCount: 3739 },

        // === MOTIVATION / GENERAL ===
        { id: 'mot-01', series: 'motivation', day: null, title: 'Hard Work & Consistency', caption: 'Hard work and consistency beats talent if talent doesn\'t beat them.\nBut how will you know your potential until you work so hard how will you define your limit until you reach that limit?\nDon\'t let the brain play tricks on you and get the work in be your best self and live the life regret free\n\nBe strong 🗿\n\n#Motivation #Growth #Mindset #Transformation #TopPercent', url: 'https://www.instagram.com/p/DH0HM0uzil6/', timestamp: '2025-03-30T07:00:38.000Z', commentsCount: 400, likesCount: 190670 },
        { id: 'mot-02', series: 'motivation', day: null, title: 'Calorie Tracking Tips', caption: 'Nine months ago I used to be fat and when I looked onto people transforming their life and losing fat, the key thing they mentioned was not eating sugar.\nBut being a certified nutritionist and in this industry for past 9+ years, I know that\'s not true and you can lose fat while eating all your favorite food like pizza, burger or XYZ anything.\nThe key is tracking your daily calories and eating below the calorie maintenance.\n\nApps — Healthyfyme, Myfitness pal, or any calorie tracking app\n\n#FatLoss #FatLossTips #HowToGetAbs #HowToGetLean', url: 'https://www.instagram.com/p/DJGhvMZTlnB/', timestamp: '2025-05-01T07:07:50.000Z', commentsCount: 3, likesCount: 349 },
        { id: 'mot-03', series: 'motivation', day: null, title: 'The Power of Showing Up', caption: 'The power of showing up, even when you don\'t want to.\nThe power of doing the same thing again and again and again.\nAs said by the Bruce Lee himself, he was not afraid of the guy who knew thousand different moves, but was afraid of the one who practiced a single move thousand times.\n\nBeing disciplined is a choice that the greatest make everyday.\n\n#growth #mindset #motivation #transformation', url: 'https://www.instagram.com/p/DK36gB_TXuj/', timestamp: '2025-06-14T08:03:56.000Z', commentsCount: 2, likesCount: 100 },
        { id: 'mot-04', series: 'motivation', day: null, title: 'Lock In — Transform Your Life', caption: 'Lock in now — within a few months you can transform your life completely and be a different person — lets achieve the goals we have set for ourselves — lets work on those dreams that our childhood self saw — lets take actions\n\n#Motivation #transformation #fatloss #mindsetshift', url: 'https://www.instagram.com/p/DMSDZv3T-BX/', timestamp: '2025-07-19T08:10:09.000Z', commentsCount: 22, likesCount: 784 },
        { id: 'mot-05', series: 'motivation', day: null, title: 'Mindset of Champions', caption: 'Mindset of Champions — One small win leads to another and then it turns into Domino effect — the wins compound and the results are huge.\n\nIts you vs you all the time\n\n#mindsetofachampion #motivation #growth #transformation #thedisciplinedguy', url: 'https://www.instagram.com/p/DM2_Mo_TO_l/', timestamp: '2025-08-02T16:23:50.000Z', commentsCount: 12, likesCount: 310 },
        { id: 'mot-06', series: 'motivation', day: null, title: '20 kg+ Fat Loss Journey', caption: '20 kg + Fat loss Journey —\n\nFat loss transformation time-lapse\nMotivation for you to transform from fat to fit\n\n#motivation #growth #mindset #transformation #toppercent', url: 'https://www.instagram.com/p/DM78AWSTIsX/', timestamp: '2025-08-04T14:30:00.000Z', commentsCount: 30, likesCount: 1313 },
    ];

    // ==========================================
    //  STATE MANAGEMENT
    // ==========================================
    const STORAGE_KEY = 'disciplineTracker_v1';
    const NOTES_KEY = 'disciplineTracker_notes';
    const THEME_KEY = 'disciplineTracker_theme';

    function loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : { completed: {}, streak: 0, lastActivity: null, activities: [] };
        } catch (e) {
            return { completed: {}, streak: 0, lastActivity: null, activities: [] };
        }
    }

    function saveState(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function loadNotes() {
        try {
            const saved = localStorage.getItem(NOTES_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    }

    function saveNotes(notes) {
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    }

    let state = loadState();
    let notes = loadNotes();
    let previousMilestone = null;

    // ==========================================
    //  CLOUD SYNC (Firestore)
    // ==========================================
    function getUserDocRef() {
        if (!currentUser) return null;
        return db.collection('users').doc(currentUser.uid);
    }

    async function syncToCloud() {
        const ref = getUserDocRef();
        if (!ref) return;
        try {
            await ref.set({
                completed: state.completed,
                streak: state.streak,
                activities: state.activities,
                notes: notes,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.warn('Cloud sync failed:', err);
        }
    }

    async function loadFromCloud() {
        const ref = getUserDocRef();
        if (!ref) return;
        try {
            const doc = await ref.get();
            if (doc.exists) {
                const cloud = doc.data();
                // Merge: cloud wins for completed items (union of both)
                if (cloud.completed) {
                    Object.keys(cloud.completed).forEach(id => {
                        if (!state.completed[id]) {
                            state.completed[id] = cloud.completed[id];
                        }
                    });
                }
                if (cloud.activities && cloud.activities.length > 0) {
                    // Merge activities, deduplicate by time+id, keep latest 20
                    const merged = [...state.activities, ...cloud.activities];
                    const seen = new Set();
                    state.activities = merged.filter(a => {
                        const key = a.id + a.time;
                        if (seen.has(key)) return false;
                        seen.add(key);
                        return true;
                    }).sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 20);
                }
                if (cloud.notes) {
                    Object.keys(cloud.notes).forEach(id => {
                        if (!notes[id]) {
                            notes[id] = cloud.notes[id];
                        }
                    });
                    saveNotes(notes);
                }
                updateStreak();
                saveState(state);
                renderAll();
                showToast('☁️ Synced from cloud!', 'success');
            } else {
                // First time: push local data to cloud
                await syncToCloud();
            }
        } catch (err) {
            console.warn('Cloud load failed:', err);
        }
    }

    // ==========================================
    //  UTILITY FUNCTIONS
    // ==========================================
    function formatDate(isoStr) {
        const d = new Date(isoStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function formatDateShort(isoStr) {
        const d = new Date(isoStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    function getMonthYear(isoStr) {
        const d = new Date(isoStr);
        return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    function formatNumber(num) {
        if (num < 0) return '—';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    function getSeriesLabel(series) {
        const labels = { fattofit: 'Fat to Fit', muscle: 'Muscle Building', motivation: 'Motivation' };
        return labels[series] || series;
    }

    function getSeriesByType(type) {
        return ALL_EPISODES.filter(ep => ep.series === type);
    }

    function isCompleted(id) {
        return !!state.completed[id];
    }

    function toggleComplete(id) {
        if (state.completed[id]) {
            delete state.completed[id];
            addActivity(id, 'uncompleted');
        } else {
            state.completed[id] = new Date().toISOString();
            addActivity(id, 'completed');
        }
        updateStreak();
        saveState(state);
        syncToCloud();
        checkMilestones();
        renderAll();
    }

    function addActivity(id, action) {
        const ep = ALL_EPISODES.find(e => e.id === id);
        if (!ep) return;
        state.activities.unshift({
            id,
            action,
            title: ep.title,
            time: new Date().toISOString()
        });
        // Keep last 20 activities
        if (state.activities.length > 20) state.activities = state.activities.slice(0, 20);
    }

    function updateStreak() {
        const completedDates = Object.values(state.completed)
            .map(d => new Date(d).toDateString())
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort((a, b) => new Date(b) - new Date(a));

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < completedDates.length; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            if (completedDates.includes(checkDate.toDateString())) {
                streak++;
            } else {
                break;
            }
        }
        state.streak = streak;
    }

    // ==========================================
    //  TAB NAVIGATION
    // ==========================================
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + target).classList.add('active');
        });
    });

    // ==========================================
    //  RENDER FUNCTIONS
    // ==========================================
    function renderAll() {
        renderDashboardStats();
        renderSeriesOverview();
        renderPopularEpisodes();
        renderActivityList();
        renderFatToFitGrid();
        renderMuscleGrid();
        renderTimeline();
        renderStreak();
    }

    function renderDashboardStats() {
        const total = ALL_EPISODES.length;
        const completed = Object.keys(state.completed).length;
        const remaining = total - completed;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        document.getElementById('totalCompleted').textContent = completed;
        document.getElementById('totalRemaining').textContent = remaining;
        document.getElementById('progressPercent').textContent = percent + '%';
        document.getElementById('totalEpisodes').textContent = total;
        document.getElementById('progressText').textContent = `${completed} / ${total} episodes`;
        document.getElementById('progressBarFill').style.width = percent + '%';
    }

    function renderStreak() {
        document.getElementById('streakCount').textContent = state.streak;
    }

    function renderSeriesOverview() {
        const container = document.getElementById('seriesCards');
        const seriesData = [
            { key: 'fattofit', emoji: '🔥', title: 'Fat to Fit Series', desc: 'Science-based fat loss tips from Day 1 to Day 12', tab: 'fattofit' },
            { key: 'muscle', emoji: '💪', title: 'Muscle Building Series', desc: 'A decade of bodybuilding wisdom — Episodes 14 to 54', tab: 'muscle' },
            { key: 'motivation', emoji: '🧠', title: 'Motivation & Mindset', desc: 'Mindset mantras, transformation stories & discipline tips', tab: 'calendar' }
        ];

        container.innerHTML = seriesData.map(s => {
            const episodes = getSeriesByType(s.key);
            const completed = episodes.filter(ep => isCompleted(ep.id)).length;
            const total = episodes.length;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

            return `
                <div class="series-card series-card--${s.key}" data-tab="${s.tab}">
                    <div class="series-card-header">
                        <span class="series-card-emoji">${s.emoji}</span>
                        <span class="series-card-badge">${total} episodes</span>
                    </div>
                    <h3 class="series-card-title">${s.title}</h3>
                    <p class="series-card-desc">${s.desc}</p>
                    <div class="series-card-progress">
                        <div class="series-card-progress-header">
                            <span class="series-card-progress-label">${completed} of ${total} completed</span>
                            <span class="series-card-progress-value">${pct}%</span>
                        </div>
                        <div class="series-mini-progress">
                            <div class="series-mini-fill" style="width: ${pct}%"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Click handler for series cards
        container.querySelectorAll('.series-card').forEach(card => {
            card.addEventListener('click', () => {
                const tab = card.dataset.tab;
                navTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
                document.getElementById('tab-' + tab).classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    function renderActivityList() {
        const container = document.getElementById('activityList');
        if (state.activities.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    <p>Start watching episodes to see your activity here!</p>
                </div>`;
            return;
        }

        container.innerHTML = state.activities.slice(0, 8).map(a => {
            const isComp = a.action === 'completed';
            const timeAgo = getTimeAgo(a.time);
            return `
                <div class="activity-item">
                    <div class="activity-dot ${isComp ? 'activity-dot--completed' : 'activity-dot--uncompleted'}"></div>
                    <div class="activity-text">
                        <strong>${isComp ? '✅ Completed' : '↩️ Unchecked'}</strong> — ${a.title}
                    </div>
                    <span class="activity-time">${timeAgo}</span>
                </div>`;
        }).join('');
    }

    function getTimeAgo(isoStr) {
        const diff = Date.now() - new Date(isoStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }

    function renderEpisodeCard(ep, seriesClass) {
        const completed = isCompleted(ep.id);
        const caption = ep.caption.replace(/#\w+/g, '').trim();
        const displayCaption = caption.length > 150 ? caption.slice(0, 150) + '…' : caption;

        return `
            <div class="episode-card ${seriesClass ? 'episode-card--' + seriesClass : ''} ${completed ? 'completed' : ''}" data-id="${ep.id}">
                <div class="episode-card-header">
                    <span class="episode-number">${ep.day ? (ep.series === 'fattofit' ? 'Day ' + ep.day : 'Ep ' + ep.day) : '✨'}</span>
                    <button class="episode-check" data-id="${ep.id}" title="${completed ? 'Mark as incomplete' : 'Mark as complete'}">
                        ${completed ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                    </button>
                </div>
                <h3 style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:600;margin-bottom:8px;">${ep.title}</h3>
                <p class="episode-caption">${displayCaption}</p>
                <div class="episode-meta">
                    <span class="episode-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        ${formatDateShort(ep.timestamp)}
                    </span>
                    ${ep.likesCount > 0 ? `<span class="episode-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        ${formatNumber(ep.likesCount)}
                    </span>` : ''}
                    <span class="episode-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        ${ep.commentsCount}
                    </span>
                </div>
                <div class="episode-actions">
                    <a href="${ep.url}" target="_blank" class="episode-btn episode-btn--primary" onclick="event.stopPropagation()">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        Watch Reel
                    </a>
                    <button class="episode-btn episode-btn--detail" data-id="${ep.id}" onclick="event.stopPropagation()">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                        Details
                    </button>
                </div>
            </div>`;
    }

    function renderFatToFitGrid() {
        const container = document.getElementById('fatToFitGrid');
        const episodes = getSeriesByType('fattofit').sort((a, b) => a.day - b.day);
        container.innerHTML = episodes.map(ep => renderEpisodeCard(ep, 'fattofit')).join('');
        bindEpisodeEvents(container);
        updateProgressRing('fatToFit', episodes);
    }

    function renderMuscleGrid() {
        const container = document.getElementById('muscleGrid');
        const episodes = getSeriesByType('muscle').sort((a, b) => a.day - b.day);
        container.innerHTML = episodes.map(ep => renderEpisodeCard(ep, 'muscle')).join('');
        bindEpisodeEvents(container);
        updateProgressRing('muscle', episodes);
    }

    function updateProgressRing(prefix, episodes) {
        const completed = episodes.filter(ep => isCompleted(ep.id)).length;
        const total = episodes.length;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
        const circumference = 2 * Math.PI * 52; // r=52
        const offset = circumference - (pct / 100) * circumference;

        const fill = document.getElementById(prefix + 'RingFill');
        const text = document.getElementById(prefix + 'RingText');
        if (fill) fill.style.strokeDashoffset = offset;
        if (text) text.textContent = pct + '%';
    }

    function bindEpisodeEvents(container) {
        // Check button
        container.querySelectorAll('.episode-check').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                toggleComplete(id);
                showToast(isCompleted(id) ? '✅ Marked as completed!' : '↩️ Marked as incomplete', isCompleted(id) ? 'success' : 'info');
            });
        });

        // Detail button
        container.querySelectorAll('.episode-btn--detail').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(btn.dataset.id);
            });
        });

        // Card click → open modal
        container.querySelectorAll('.episode-card').forEach(card => {
            card.addEventListener('click', () => {
                openModal(card.dataset.id);
            });
        });
    }

    // ==========================================
    //  CALENDAR / TIMELINE
    // ==========================================
    let currentFilter = 'all';

    function renderTimeline() {
        const container = document.getElementById('timeline');
        let episodes = [...ALL_EPISODES];

        if (currentFilter !== 'all') {
            episodes = episodes.filter(ep => ep.series === currentFilter);
        }

        // Sort by date (newest first)
        episodes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Group by month
        const groups = {};
        episodes.forEach(ep => {
            const key = getMonthYear(ep.timestamp);
            if (!groups[key]) groups[key] = [];
            groups[key].push(ep);
        });

        container.innerHTML = Object.entries(groups).map(([month, eps]) => `
            <div class="timeline-month">
                <div class="timeline-month-label">${month}</div>
                <div class="timeline-items">
                    ${eps.map(ep => {
                        const completed = isCompleted(ep.id);
                        return `
                            <div class="timeline-item ${completed ? 'completed' : ''}" data-id="${ep.id}">
                                <span class="timeline-item-date">${formatDateShort(ep.timestamp)}</span>
                                <span class="timeline-item-badge timeline-item-badge--${ep.series}">${getSeriesLabel(ep.series)}</span>
                                <span class="timeline-item-title">${ep.title}</span>
                                <button class="timeline-item-check" data-id="${ep.id}">
                                    ${completed ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                                </button>
                            </div>`;
                    }).join('')}
                </div>
            </div>
        `).join('');

        // Bind events
        container.querySelectorAll('.timeline-item-check').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                toggleComplete(id);
                showToast(isCompleted(id) ? '✅ Marked as completed!' : '↩️ Marked as incomplete', isCompleted(id) ? 'success' : 'info');
            });
        });

        container.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('click', () => {
                openModal(item.dataset.id);
            });
        });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTimeline();
        });
    });

    // ==========================================
    //  MODAL
    // ==========================================
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    function openModal(id) {
        const ep = ALL_EPISODES.find(e => e.id === id);
        if (!ep) return;

        const completed = isCompleted(id);
        const tagClass = `modal-episode-tag--${ep.series}`;

        modalContent.innerHTML = `
            <span class="modal-episode-tag ${tagClass}">${getSeriesLabel(ep.series)}${ep.day ? ' — ' + (ep.series === 'fattofit' ? 'Day ' + ep.day : 'Episode ' + ep.day) : ''}</span>
            <h2 class="modal-title">${ep.title}</h2>
            <p class="modal-date">📅 ${formatDate(ep.timestamp)}</p>
            <p class="modal-caption">${ep.caption}</p>
            <div class="modal-stats">
                <div class="modal-stat">
                    <div class="modal-stat-value">${ep.likesCount > 0 ? formatNumber(ep.likesCount) : '—'}</div>
                    <div class="modal-stat-label">Likes</div>
                </div>
                <div class="modal-stat">
                    <div class="modal-stat-value">${formatNumber(ep.commentsCount)}</div>
                    <div class="modal-stat-label">Comments</div>
                </div>
                <div class="modal-stat">
                    <div class="modal-stat-value">${completed ? '✅' : '⏳'}</div>
                    <div class="modal-stat-label">Status</div>
                </div>
            </div>
            <div class="modal-actions">
                <a href="${ep.url}" target="_blank" class="modal-btn modal-btn--watch">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Watch on Instagram
                </a>
                <button class="modal-btn modal-btn--toggle ${completed ? 'completed' : ''}" id="modalToggle" data-id="${id}">
                    ${completed ? '✅ Completed' : '☐ Mark Complete'}
                </button>
            </div>
            <div class="modal-notes">
                <h4>📝 My Notes</h4>
                <textarea class="notes-textarea" id="notesTextarea" placeholder="Write your takeaways, key insights, or personal notes...">${notes[id] || ''}</textarea>
                <div class="notes-save-hint">Auto-saved as you type</div>
            </div>
        `;

        // Toggle complete from modal
        document.getElementById('modalToggle').addEventListener('click', () => {
            toggleComplete(id);
            openModal(id); // Re-render modal
            showToast(isCompleted(id) ? '✅ Marked as completed!' : '↩️ Marked as incomplete', isCompleted(id) ? 'success' : 'info');
        });

        // Notes auto-save
        const notesTextarea = document.getElementById('notesTextarea');
        let notesTimeout;
        notesTextarea.addEventListener('input', () => {
            clearTimeout(notesTimeout);
            notesTimeout = setTimeout(() => {
                if (notesTextarea.value.trim()) {
                    notes[id] = notesTextarea.value;
                } else {
                    delete notes[id];
                }
                saveNotes(notes);
                syncToCloud();
            }, 400);
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // ==========================================
    //  THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        // Update icon
        if (theme === 'light') {
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
        } else {
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
        }
        // Update meta theme-color
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme === 'light' ? '#f5f5fa' : '#0a0a0f';
    }

    // Init theme
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    if (savedTheme === 'light') setTheme('light');

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'light' ? 'dark' : 'light');
    });

    // ==========================================
    //  SEARCH
    // ==========================================
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchKbd = document.getElementById('searchKbd');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length < 2) {
            searchResults.classList.remove('active');
            searchKbd.style.display = query.length === 0 ? '' : 'none';
            return;
        }
        searchKbd.style.display = 'none';

        const results = ALL_EPISODES.filter(ep => {
            const searchStr = `${ep.title} ${ep.caption} day ${ep.day || ''} episode ${ep.day || ''}`.toLowerCase();
            return searchStr.includes(query);
        });

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-empty">No episodes found for "' + query + '"</div>';
        } else {
            searchResults.innerHTML = results.slice(0, 8).map(ep => {
                const badgeClass = `timeline-item-badge--${ep.series}`;
                return `
                    <div class="search-result-item" data-id="${ep.id}">
                        <span class="search-result-badge ${badgeClass}">${getSeriesLabel(ep.series)}</span>
                        <span class="search-result-title">${ep.title}</span>
                        <span class="search-result-check">${isCompleted(ep.id) ? '✅' : '⏳'}</span>
                    </div>
                `;
            }).join('');
        }

        searchResults.classList.add('active');

        // Click handler
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                openModal(item.dataset.id);
                searchInput.value = '';
                searchResults.classList.remove('active');
                searchKbd.style.display = '';
            });
        });
    });

    searchInput.addEventListener('focus', () => {
        searchKbd.style.display = 'none';
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchResults.classList.remove('active');
            if (!searchInput.value) searchKbd.style.display = '';
        }, 200);
    });

    // ==========================================
    //  POPULAR EPISODES
    // ==========================================
    function renderPopularEpisodes() {
        const container = document.getElementById('popularList');
        const sorted = [...ALL_EPISODES]
            .filter(ep => ep.likesCount > 0)
            .sort((a, b) => b.likesCount - a.likesCount)
            .slice(0, 6);

        container.innerHTML = sorted.map((ep, i) => {
            const badgeClass = `timeline-item-badge--${ep.series}`;
            return `
                <div class="popular-item" data-id="${ep.id}">
                    <span class="popular-rank">#${i + 1}</span>
                    <div class="popular-info">
                        <div class="popular-title">${ep.title}</div>
                        <div class="popular-stats">❤️ ${formatNumber(ep.likesCount)} · 💬 ${formatNumber(ep.commentsCount)}</div>
                    </div>
                    <span class="popular-badge ${badgeClass}">${getSeriesLabel(ep.series)}</span>
                </div>
            `;
        }).join('');

        container.querySelectorAll('.popular-item').forEach(item => {
            item.addEventListener('click', () => openModal(item.dataset.id));
        });
    }

    // ==========================================
    //  EXPORT / IMPORT
    // ==========================================
    const dataMenuBtn = document.getElementById('dataMenuBtn');
    const dataMenu = document.getElementById('dataMenu');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');

    dataMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dataMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        dataMenu.classList.remove('active');
    });

    exportBtn.addEventListener('click', () => {
        const data = {
            version: 1,
            exportedAt: new Date().toISOString(),
            state: state,
            notes: notes
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `discipline-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('📤 Progress exported successfully!', 'success');
        dataMenu.classList.remove('active');
    });

    importBtn.addEventListener('click', () => {
        importFile.click();
        dataMenu.classList.remove('active');
    });

    importFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                if (data.state && data.state.completed) {
                    state = data.state;
                    saveState(state);
                    if (data.notes) {
                        notes = data.notes;
                        saveNotes(notes);
                    }
                    syncToCloud();
                    renderAll();
                    showToast('📥 Progress imported successfully!', 'success');
                } else {
                    showToast('⚠️ Invalid backup file', 'info');
                }
            } catch (e) {
                showToast('⚠️ Failed to parse backup file', 'info');
            }
        };
        reader.readAsText(file);
        importFile.value = '';
    });

    // ==========================================
    //  CONFETTI
    // ==========================================
    const confettiCanvas = document.getElementById('confettiCanvas');
    const confettiCtx = confettiCanvas.getContext('2d');
    let confettiParticles = [];
    let confettiAnimId = null;

    function resizeConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeConfetti);
    resizeConfetti();

    function launchConfetti() {
        confettiParticles = [];
        const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9', '#fdcb6e', '#00b894', '#e17055', '#55efc4'];
        for (let i = 0; i < 150; i++) {
            confettiParticles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }
        if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
        animateConfetti();
    }

    function animateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        let alive = false;
        confettiParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.rotation += p.rotationSpeed;
            p.opacity -= 0.003;
            if (p.opacity > 0 && p.y < confettiCanvas.height + 20) {
                alive = true;
                confettiCtx.save();
                confettiCtx.globalAlpha = p.opacity;
                confettiCtx.translate(p.x, p.y);
                confettiCtx.rotate((p.rotation * Math.PI) / 180);
                confettiCtx.fillStyle = p.color;
                confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                confettiCtx.restore();
            }
        });
        if (alive) {
            confettiAnimId = requestAnimationFrame(animateConfetti);
        } else {
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            confettiAnimId = null;
        }
    }

    function checkMilestones() {
        const total = ALL_EPISODES.length;
        const completed = Object.keys(state.completed).length;
        const pct = Math.round((completed / total) * 100);
        const milestones = [25, 50, 75, 100];
        const currentMilestone = milestones.filter(m => pct >= m).pop() || null;

        if (currentMilestone && currentMilestone !== previousMilestone) {
            previousMilestone = currentMilestone;
            launchConfetti();
            setTimeout(() => {
                showToast(`🎉 Amazing! You've reached ${currentMilestone}% completion!`, 'success');
            }, 300);
        }
        if (!currentMilestone) previousMilestone = null;
    }

    // ==========================================
    //  KEYBOARD SHORTCUTS
    // ==========================================
    const shortcutsHelp = document.getElementById('shortcutsHelp');
    const shortcutsClose = document.getElementById('shortcutsClose');

    shortcutsClose.addEventListener('click', () => {
        shortcutsHelp.classList.remove('active');
    });

    shortcutsHelp.addEventListener('click', (e) => {
        if (e.target === shortcutsHelp) shortcutsHelp.classList.remove('active');
    });

    // ==========================================
    //  AUTH — Google Sign-In
    // ==========================================
    const signInBtn = document.getElementById('signInBtn');
    const signInText = document.getElementById('signInText');
    const provider = new firebase.auth.GoogleAuthProvider();

    function updateAuthUI(user) {
        if (user) {
            const name = user.displayName ? user.displayName.split(' ')[0] : 'User';
            const photo = user.photoURL;
            signInBtn.classList.add('signed-in');
            if (photo) {
                signInBtn.innerHTML = `<img src="${photo}" class="user-avatar" alt=""> ${name} <span class="sync-indicator"></span>`;
            } else {
                signInText.textContent = name;
                signInBtn.innerHTML += ' <span class="sync-indicator"></span>';
            }
            signInBtn.title = 'Click to sign out';
        } else {
            signInBtn.classList.remove('signed-in');
            signInBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>Sign In</span>';
            signInBtn.title = 'Sign in to sync across devices';
        }
    }

    signInBtn.addEventListener('click', () => {
        console.log('=== SIGN IN CLICKED ===');
        if (currentUser) {
            auth.signOut().then(() => {
                currentUser = null;
                updateAuthUI(null);
                showToast('👋 Signed out', 'info');
            });
        } else {
            console.log('Attempting signInWithPopup...');
            auth.signInWithPopup(provider).then((result) => {
                console.log('=== POPUP SUCCESS ===', result.user.email, result.user.displayName);
                showToast('✅ Signed in as ' + result.user.displayName, 'success');
            }).catch((err) => {
                console.error('=== POPUP ERROR ===', err.code, err.message);
                showToast('⚠️ Sign-in error: ' + err.code + ' — Please allow popups for this site', 'info');
            });
        }
    });

    // Auth state listener
    console.log('=== Setting up auth listener ===');
    auth.onAuthStateChanged(async (user) => {
        console.log('=== AUTH STATE CHANGED ===', user ? user.email : 'null');
        currentUser = user;
        updateAuthUI(user);
        if (user) {
            await loadFromCloud();
        }
    });

    // ==========================================
    //  TOAST NOTIFICATIONS
    // ==========================================
    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '🎉' : 'ℹ️'}</span>
            <span class="toast-text">${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 3000);
    }

    // ==========================================
    //  INITIALIZATION
    // ==========================================
    // Calculate initial milestone to avoid false trigger
    const initPct = Math.round((Object.keys(state.completed).length / ALL_EPISODES.length) * 100);
    previousMilestone = [25, 50, 75, 100].filter(m => initPct >= m).pop() || null;

    updateStreak();
    renderAll();

    // Global keyboard handler
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in inputs
        const tag = document.activeElement.tagName;
        const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';

        if (e.key === 'Escape') {
            if (shortcutsHelp.classList.contains('active')) {
                shortcutsHelp.classList.remove('active');
            } else if (modalOverlay.classList.contains('active')) {
                closeModal();
            } else if (searchInput === document.activeElement) {
                searchInput.blur();
                searchInput.value = '';
                searchResults.classList.remove('active');
                searchKbd.style.display = '';
            }
            return;
        }

        if (isTyping) return;

        if (e.key === '/') {
            e.preventDefault();
            searchInput.focus();
            return;
        }

        if (e.key === '?') {
            e.preventDefault();
            shortcutsHelp.classList.toggle('active');
            return;
        }

        const tabKeys = { '1': 'dashboard', '2': 'fattofit', '3': 'muscle', '4': 'calendar' };
        if (tabKeys[e.key]) {
            e.preventDefault();
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            document.querySelector(`[data-tab="${tabKeys[e.key]}"]`).classList.add('active');
            document.getElementById('tab-' + tabKeys[e.key]).classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Welcome toast
    const totalCompleted = Object.keys(state.completed).length;
    if (totalCompleted === 0) {
        setTimeout(() => {
            showToast('Welcome! Start tracking your fitness journey 💪', 'info');
        }, 800);
    } else {
        setTimeout(() => {
            showToast(`Welcome back! ${totalCompleted} episodes completed 🔥`, 'success');
        }, 500);
    }

    // PWA Service Worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    }

})();
