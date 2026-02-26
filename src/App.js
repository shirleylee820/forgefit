import { useState } from "react";

// ─── GOALS ───────────────────────────────────────────────────────────────────
const GOALS = {
  weightLoss:  { label:"Weight Loss",  icon:"🔥", color:"#FF6B35", calories:1600, protein:150, description:"Burn fat, preserve muscle" },
  muscleGain:  { label:"Muscle Gain",  icon:"💪", color:"#00C896", calories:2800, protein:200, description:"Build size and strength" },
  endurance:   { label:"Endurance",    icon:"⚡", color:"#4F8EF7", calories:2200, protein:160, description:"Go further, faster" },
  maintenance: { label:"Maintenance",  icon:"⚖️", color:"#A259FF", calories:2000, protein:140, description:"Stay strong and balanced" },
};

// ─── WORKOUTS (4 weeks × 7 days, keyed by goal) ──────────────────────────────
const WORKOUTS = {
  weightLoss: {
    1: [
      { day:"Mon", type:"Weights",     name:"Upper Body Foundation",   duration:"45 min", intensity:"High",     calories:320, exercises:["Bench Press 4×10","Dumbbell Rows 4×10","Shoulder Press 3×12","Bicep Curls 3×15","Tricep Dips 3×15"] },
      { day:"Tue", type:"Hyrox",       name:"Hyrox Intro Circuit",     duration:"40 min", intensity:"High",     calories:480, exercises:["1km Run","50 Sled Pushes 20kg","1km Run","50 KB Swings 16kg","1km Run","50 Wall Balls 6kg"] },
      { day:"Wed", type:"Weights",     name:"Lower Body Foundation",   duration:"45 min", intensity:"High",     calories:340, exercises:["Back Squats 4×10","Romanian Deadlifts 4×10","Walking Lunges 3×12 each","Leg Press 3×15","Calf Raises 4×20"] },
      { day:"Thu", type:"Cardio",      name:"Easy Recovery Run",       duration:"30 min", intensity:"Low",      calories:180, exercises:["30 min easy jog","Full body stretch","Foam rolling"] },
      { day:"Fri", type:"Hyrox",       name:"Hyrox Station Drill",     duration:"55 min", intensity:"Very High",calories:560, exercises:["4×1km Runs","Ski Erg 4×500m","Sled Push 4×25m","Burpee Broad Jump 4×20m","SkiErg cool-down 500m"] },
      { day:"Sat", type:"Weights",     name:"Full Body Blast",         duration:"50 min", intensity:"High",     calories:380, exercises:["Deadlifts 4×8","Pull-Ups 4×8","Bulgarian Split Squats 3×10","DB Chest Press 3×12","Core Circuit 3 rounds"] },
      { day:"Sun", type:"Rest",        name:"Active Recovery",         duration:"–",      intensity:"–",        calories:0,   exercises:["Light walk or yoga","Hydrate well","Meal prep for the week"] },
    ],
    2: [
      { day:"Mon", type:"Weights",     name:"Push Hypertrophy",        duration:"50 min", intensity:"High",     calories:340, exercises:["Incline Bench Press 4×10","Cable Fly 3×12","Seated DB Shoulder Press 4×10","Lateral Raises 3×15","Close-Grip Push-Ups 3×15"] },
      { day:"Tue", type:"Cardio",      name:"Interval Sprint Run",     duration:"35 min", intensity:"Very High",calories:420, exercises:["10 min warm-up","8×200m sprints (90s rest)","5 min cool-down jog","Stretch"] },
      { day:"Wed", type:"Hyrox",       name:"Hyrox Chipper",           duration:"50 min", intensity:"Very High",calories:520, exercises:["2km Run","100 Sled Pushes 20kg","2km Run","100 Wall Balls 6kg","2km Run"] },
      { day:"Thu", type:"Weights",     name:"Pull Hypertrophy",        duration:"50 min", intensity:"High",     calories:330, exercises:["Barbell Rows 4×10","Lat Pulldown 4×10","Seated Cable Row 3×12","Face Pulls 3×15","EZ Bar Curl 3×12"] },
      { day:"Fri", type:"Cardio",      name:"Tempo Run",               duration:"40 min", intensity:"High",     calories:380, exercises:["10 min warm-up","20 min tempo pace","10 min cool-down"] },
      { day:"Sat", type:"Hyrox",       name:"Race Pace Simulation",    duration:"65 min", intensity:"Max",      calories:640, exercises:["Full 8-station Hyrox format","8×1km runs","All 8 Hyrox functional stations","Goal: sub-70 min finish"] },
      { day:"Sun", type:"Rest",        name:"Rest & Recover",          duration:"–",      intensity:"–",        calories:0,   exercises:["Full rest","Foam rolling","Sleep 8+ hrs"] },
    ],
    3: [
      { day:"Mon", type:"Weights",     name:"Strength Upper Body",     duration:"55 min", intensity:"High",     calories:360, exercises:["Bench Press 5×5","Weighted Pull-Ups 4×6","DB Shoulder Press 4×8","Dips 3×10","Cable Tricep Pushdown 3×15"] },
      { day:"Tue", type:"Hyrox",       name:"Hyrox Time Trial",        duration:"60 min", intensity:"Max",      calories:680, exercises:["Time yourself on full Hyrox course","Track splits per station","Aim to beat Week 1 time"] },
      { day:"Wed", type:"Cardio",      name:"Hill Intervals",          duration:"40 min", intensity:"Very High",calories:450, exercises:["10 min flat warm-up","10×60s hill sprints","Walk back down recovery","10 min cool-down"] },
      { day:"Thu", type:"Weights",     name:"Strength Lower Body",     duration:"55 min", intensity:"High",     calories:380, exercises:["Front Squats 5×5","Sumo Deadlifts 4×6","Step-Ups 3×10 each","Leg Curl 3×12","Nordic Curls 3×8"] },
      { day:"Fri", type:"Hyrox",       name:"Hyrox Weakness Work",     duration:"45 min", intensity:"High",     calories:480, exercises:["Ski Erg technique 3×1km","Sled Push heavy 6×25m","Farmers Carry 4×40m","Sandbag Lunges 3×20m"] },
      { day:"Sat", type:"Weights",     name:"Metabolic AMRAP",         duration:"45 min", intensity:"Very High",calories:420, exercises:["AMRAP 40 min:","10 DB Thrusters","10 Box Jumps","10 KB Swings","10 Burpees","Rest 2 min between rounds"] },
      { day:"Sun", type:"Rest",        name:"Active Recovery",         duration:"–",      intensity:"–",        calories:0,   exercises:["Easy swim or walk","Mobility session","Epsom salt bath"] },
    ],
    4: [
      { day:"Mon", type:"Weights",     name:"Peak Upper Body",         duration:"55 min", intensity:"High",     calories:370, exercises:["Bench Press 5×3 (heavy)","Weighted Chin-Ups 4×5","Arnold Press 4×8","Cable Fly 3×12","Superset: Curls + Extensions 3×12"] },
      { day:"Tue", type:"Cardio",      name:"5K Race Effort",          duration:"30 min", intensity:"Max",      calories:400, exercises:["Full 5K at race pace","Track time","Cool-down 10 min"] },
      { day:"Wed", type:"Hyrox",       name:"Hyrox Peak Simulation",   duration:"70 min", intensity:"Max",      calories:720, exercises:["Full competition Hyrox format","Race start protocol","Aim for personal best","Post-race stretch"] },
      { day:"Thu", type:"Weights",     name:"Peak Lower Body",         duration:"55 min", intensity:"High",     calories:400, exercises:["Back Squats 5×3 (heavy)","Romanian Deadlifts 4×6","Box Jumps 4×8","Glute Bridges 3×12","Single-Leg Press 3×10"] },
      { day:"Fri", type:"Cardio",      name:"Easy Shake-Out Run",      duration:"25 min", intensity:"Low",      calories:160, exercises:["25 min very easy jog","Leg shakeout","Light stretching"] },
      { day:"Sat", type:"Hyrox",       name:"Final Challenge",         duration:"60 min", intensity:"Max",      calories:680, exercises:["Full Hyrox benchmark test","Compare to Week 1","Celebrate your progress!"] },
      { day:"Sun", type:"Rest",        name:"Programme Complete! 🎉",  duration:"–",      intensity:"–",        calories:0,   exercises:["Rest & celebrate","Reflect on progress","Plan next programme"] },
    ],
  },
  muscleGain: {
    1: [
      { day:"Mon", type:"Weights", name:"Chest & Triceps Foundation", duration:"55 min", intensity:"High", calories:300, exercises:["Bench Press 5×5","Incline DB Press 4×8","Cable Fly 3×12","Skull Crushers 3×10","Tricep Pushdown 3×15"] },
      { day:"Tue", type:"Weights", name:"Back & Biceps Foundation",   duration:"55 min", intensity:"High", calories:310, exercises:["Deadlift 5×5","Barbell Rows 4×8","Lat Pulldown 3×12","Face Pulls 3×15","Hammer Curls 3×12"] },
      { day:"Wed", type:"Cardio",  name:"Easy Cardio",                duration:"30 min", intensity:"Low",  calories:200, exercises:["30 min easy run","Stretch"] },
      { day:"Thu", type:"Weights", name:"Legs & Glutes Foundation",   duration:"60 min", intensity:"High", calories:360, exercises:["Squats 5×5","Leg Press 4×10","RDL 4×8","Hip Thrust 3×12","Leg Curl 3×12"] },
      { day:"Fri", type:"Weights", name:"Shoulders & Arms",           duration:"50 min", intensity:"High", calories:290, exercises:["OHP 4×8","Lateral Raises 4×12","Arnold Press 3×10","Barbell Curl 3×10","Dips 3×10"] },
      { day:"Sat", type:"Hyrox",   name:"Conditioning Day",           duration:"45 min", intensity:"Med",  calories:420, exercises:["2km Row","50 Sled Pushes","50 KB Swings","2km Run"] },
      { day:"Sun", type:"Rest",    name:"Rest & Recover",             duration:"–",      intensity:"–",    calories:0,   exercises:["Rest & recover","Mobility work","Meal prep"] },
    ],
    2: [
      { day:"Mon", type:"Weights", name:"Chest Volume Block",         duration:"60 min", intensity:"High", calories:320, exercises:["Bench Press 4×8","Incline Bench 4×8","DB Fly 3×12","Decline Push-Up 3×15","Cable Cross 3×15"] },
      { day:"Tue", type:"Weights", name:"Back Volume Block",          duration:"60 min", intensity:"High", calories:330, exercises:["Deadlift 4×6","Pendlay Row 4×8","Chest-Supported Row 3×12","Straight-Arm Pulldown 3×15","EZ Curl 3×12"] },
      { day:"Wed", type:"Cardio",  name:"Moderate Jog",               duration:"35 min", intensity:"Med",  calories:250, exercises:["35 min steady-state run","Foam roll"] },
      { day:"Thu", type:"Weights", name:"Legs Volume Block",          duration:"65 min", intensity:"High", calories:380, exercises:["Back Squat 4×8","Hack Squat 4×10","Leg Curl 4×12","Glute Bridge 3×15","Calf Raises 4×20"] },
      { day:"Fri", type:"Weights", name:"Shoulder Volume Block",      duration:"55 min", intensity:"High", calories:300, exercises:["Seated OHP 4×8","Cable Lateral 4×15","Rear Delt Fly 3×15","Shrugs 3×12","Superset: Front Raise+Upright Row 3×10"] },
      { day:"Sat", type:"Hyrox",   name:"Hyrox Conditioning",         duration:"50 min", intensity:"High", calories:480, exercises:["3km Run","Sled Push 3×50m","Sandbag Carry 3×40m","Wall Balls 3×30"] },
      { day:"Sun", type:"Rest",    name:"Rest",                       duration:"–",      intensity:"–",    calories:0,   exercises:["Full rest","Mobility","Sleep"] },
    ],
    3: [
      { day:"Mon", type:"Weights", name:"Chest Strength Focus",       duration:"60 min", intensity:"High", calories:340, exercises:["Bench Press 5×3","Board Press 4×5","Weighted Dips 4×8","Cable Fly 3×12","Superset: Flys+Push-Ups 3×10"] },
      { day:"Tue", type:"Weights", name:"Back Strength Focus",        duration:"60 min", intensity:"High", calories:350, exercises:["Deadlift 5×3","Weighted Pull-Ups 4×6","T-Bar Row 4×8","Cable Row 3×12","Bicep 21s 3×1"] },
      { day:"Wed", type:"Cardio",  name:"Interval Run",               duration:"30 min", intensity:"High", calories:320, exercises:["6×400m intervals","90s rest between","Cool-down 10 min"] },
      { day:"Thu", type:"Weights", name:"Legs Strength Focus",        duration:"65 min", intensity:"High", calories:400, exercises:["Front Squat 5×3","Paused Squat 4×5","RDL 4×6","Leg Press 3×15","Nordic Curl 3×6"] },
      { day:"Fri", type:"Weights", name:"Arms Specialisation",        duration:"50 min", intensity:"High", calories:280, exercises:["Incline DB Curl 4×12","Preacher Curl 3×12","Overhead Tricep 4×12","Skull Crusher 3×10","Dips to failure 3×"] },
      { day:"Sat", type:"Hyrox",   name:"Hyrox Peak Effort",          duration:"60 min", intensity:"Max",  calories:600, exercises:["Full Hyrox simulation","Beat week 1 time"] },
      { day:"Sun", type:"Rest",    name:"Active Recovery",            duration:"–",      intensity:"–",    calories:0,   exercises:["Sauna/steam","Foam roll","Light walk"] },
    ],
    4: [
      { day:"Mon", type:"Weights", name:"Peak Chest Day",             duration:"60 min", intensity:"High", calories:350, exercises:["1RM Attempt Bench Press","Back-off sets 3×5","Incline DB 3×10","Cable Fly 3×12"] },
      { day:"Tue", type:"Weights", name:"Peak Back Day",              duration:"60 min", intensity:"High", calories:360, exercises:["1RM Attempt Deadlift","Back-off rows 3×6","Pull-Ups 3×max","Face Pulls 3×20"] },
      { day:"Wed", type:"Cardio",  name:"Easy Jog",                   duration:"25 min", intensity:"Low",  calories:180, exercises:["Easy recovery jog","Stretch thoroughly"] },
      { day:"Thu", type:"Weights", name:"Peak Legs Day",              duration:"65 min", intensity:"High", calories:410, exercises:["1RM Attempt Squat","Back-off sets 3×5","Leg Press 3×12","Calf raises 4×20"] },
      { day:"Fri", type:"Weights", name:"Full Body Finisher",         duration:"55 min", intensity:"High", calories:330, exercises:["Power Cleans 4×5","Push Press 4×6","Weighted Lunges 3×10","Core Finisher 3 rounds"] },
      { day:"Sat", type:"Hyrox",   name:"Final Challenge",            duration:"60 min", intensity:"Max",  calories:600, exercises:["Final Hyrox challenge","Track PR times","Celebrate your gains! 💪"] },
      { day:"Sun", type:"Rest",    name:"Programme Complete! 🎉",     duration:"–",      intensity:"–",    calories:0,   exercises:["Rest","Reflect","Plan next block"] },
    ],
  },
  endurance: {
    1:[
      { day:"Mon", type:"Cardio",  name:"Base Run",            duration:"40 min", intensity:"Low",      calories:320, exercises:["40 min easy aerobic run","HR zone 2","Cool-down stretch"] },
      { day:"Tue", type:"Hyrox",   name:"Hyrox Intro",         duration:"45 min", intensity:"High",     calories:460, exercises:["Ski Erg 4×500m","Sled Push 4×25m","Rowing 4×500m","Wall Balls 4×20"] },
      { day:"Wed", type:"Weights", name:"Strength Support",    duration:"40 min", intensity:"Med",      calories:260, exercises:["Squats 3×10","RDL 3×10","Single-Leg Press 3×10","Core Work 3 rounds"] },
      { day:"Thu", type:"Cardio",  name:"Long Run",            duration:"60 min", intensity:"Low",      calories:500, exercises:["60 min easy-paced run","Focus on form","Hydrate every 15 min"] },
      { day:"Fri", type:"Cardio",  name:"Speed Intervals",    duration:"40 min", intensity:"Very High", calories:420, exercises:["10 min warm-up","10×400m sprints","Rest 90s between","Cool-down"] },
      { day:"Sat", type:"Hyrox",   name:"Hyrox Race Sim",      duration:"70 min", intensity:"Max",      calories:700, exercises:["Full 8-station Hyrox format","8×1km runs + stations","Goal: sub-80 min"] },
      { day:"Sun", type:"Rest",    name:"Recovery",            duration:"–",      intensity:"–",        calories:0,   exercises:["Rest or easy walk","Stretching"] },
    ],
    2:[
      { day:"Mon", type:"Cardio",  name:"Tempo Run",           duration:"45 min", intensity:"High",     calories:400, exercises:["10 min warm-up","25 min threshold pace","10 min cool-down"] },
      { day:"Tue", type:"Hyrox",   name:"Hyrox Intervals",     duration:"50 min", intensity:"High",     calories:500, exercises:["Ski Erg 5×500m","Sled Push 5×25m","Burpee Broad Jump 5×20m","KB Swings 5×20"] },
      { day:"Wed", type:"Weights", name:"Leg Strength",        duration:"45 min", intensity:"High",     calories:300, exercises:["Squats 4×8","Deadlifts 3×8","Box Jumps 3×8","Calf Raises 4×20"] },
      { day:"Thu", type:"Cardio",  name:"Long Slow Run",       duration:"75 min", intensity:"Low",      calories:600, exercises:["75 min zone 2 run","Fuel every 30 min","Post-run foam roll"] },
      { day:"Fri", type:"Cardio",  name:"Fartlek Run",         duration:"40 min", intensity:"Mixed",    calories:380, exercises:["Unstructured surges","30s hard / 2 min easy","Repeat throughout run"] },
      { day:"Sat", type:"Hyrox",   name:"Hyrox Benchmark",     duration:"70 min", intensity:"Max",      calories:720, exercises:["Full competition format","Time each station","Compare to Week 1"] },
      { day:"Sun", type:"Rest",    name:"Rest",                duration:"–",      intensity:"–",        calories:0,   exercises:["Full rest","Ice bath if needed"] },
    ],
    3:[
      { day:"Mon", type:"Cardio",  name:"Progression Run",     duration:"50 min", intensity:"High",     calories:440, exercises:["10 min easy","15 min moderate","15 min hard","10 min cool-down"] },
      { day:"Tue", type:"Hyrox",   name:"Hyrox Speed",         duration:"55 min", intensity:"Max",      calories:580, exercises:["Faster pace Hyrox stations","Ski Erg 6×500m fast","Sled Push 6×25m","RowErg 6×500m"] },
      { day:"Wed", type:"Weights", name:"Power & Strength",    duration:"45 min", intensity:"High",     calories:320, exercises:["Power Cleans 4×5","Squat Jumps 3×10","Box Jumps 3×8","Core circuit"] },
      { day:"Thu", type:"Cardio",  name:"Long Run",            duration:"85 min", intensity:"Low",      calories:680, exercises:["85 min zone 2","Practice race fuelling","Maintain steady pace"] },
      { day:"Fri", type:"Cardio",  name:"VO2 Max Intervals",   duration:"40 min", intensity:"Max",      calories:480, exercises:["5×1000m at VO2 max pace","3 min rest between","10 min cool-down"] },
      { day:"Sat", type:"Hyrox",   name:"Race Rehearsal",      duration:"75 min", intensity:"Max",      calories:760, exercises:["Full Hyrox race format","Target sub-75 min","Race nutrition protocol"] },
      { day:"Sun", type:"Rest",    name:"Active Recovery",     duration:"–",      intensity:"–",        calories:0,   exercises:["Easy swim or walk","Yoga","Sleep well"] },
    ],
    4:[
      { day:"Mon", type:"Cardio",  name:"Peak Tempo Run",      duration:"50 min", intensity:"High",     calories:460, exercises:["Warm-up 10 min","30 min race pace","Cool-down 10 min"] },
      { day:"Tue", type:"Hyrox",   name:"Hyrox Taper",         duration:"40 min", intensity:"Med",      calories:380, exercises:["Light Hyrox skills work","Focus on technique","No max effort"] },
      { day:"Wed", type:"Weights", name:"Maintenance Lift",    duration:"35 min", intensity:"Med",      calories:240, exercises:["Squat 3×8 moderate","RDL 3×8","Upper body pump","Short session"] },
      { day:"Thu", type:"Cardio",  name:"5K Time Trial",       duration:"30 min", intensity:"Max",      calories:420, exercises:["Warm-up 10 min","Full 5K effort","Cool-down","Record time"] },
      { day:"Fri", type:"Cardio",  name:"Easy Shake-Out",      duration:"20 min", intensity:"Low",      calories:140, exercises:["20 min very easy jog","Light stretch","Rest legs"] },
      { day:"Sat", type:"Hyrox",   name:"Final Hyrox PR Attempt",duration:"75 min",intensity:"Max",    calories:800, exercises:["Full Hyrox—go for your best time!","Race strategy: negative split","Celebrate! ⚡"] },
      { day:"Sun", type:"Rest",    name:"Programme Complete! 🎉",duration:"–",    intensity:"–",        calories:0,   exercises:["Rest & celebrate","Stretch","Plan next block"] },
    ],
  },
  maintenance: {
    1:[
      { day:"Mon", type:"Weights", name:"Push Day",            duration:"45 min", intensity:"Med", calories:280, exercises:["Bench Press 3×10","Shoulder Press 3×10","Incline DB 3×12","Tricep Dips 3×12"] },
      { day:"Tue", type:"Cardio",  name:"Easy Run",            duration:"35 min", intensity:"Low", calories:260, exercises:["35 min easy run","Stretch"] },
      { day:"Wed", type:"Weights", name:"Pull Day",            duration:"45 min", intensity:"Med", calories:290, exercises:["Deadlift 3×8","Pull-Ups 3×10","Cable Rows 3×12","Bicep Curls 3×15"] },
      { day:"Thu", type:"Cardio",  name:"Mobility",            duration:"30 min", intensity:"Low", calories:120, exercises:["Full body stretch","Foam rolling","Light walk"] },
      { day:"Fri", type:"Weights", name:"Legs",                duration:"45 min", intensity:"Med", calories:300, exercises:["Squats 3×10","Lunges 3×12","Leg Curl 3×12","Calf Raises 3×20"] },
      { day:"Sat", type:"Hyrox",   name:"Weekend Challenge",   duration:"50 min", intensity:"High",calories:460, exercises:["3km Run","Sled Push","KB Swings","Burpees"] },
      { day:"Sun", type:"Rest",    name:"Rest Day",            duration:"–",      intensity:"–",   calories:0,   exercises:["Full rest","Meal prep"] },
    ],
    2:[
      { day:"Mon", type:"Weights", name:"Push Strength",       duration:"50 min", intensity:"High",calories:300, exercises:["Bench Press 4×8","OHP 4×8","DB Fly 3×12","Cable Pushdown 3×15"] },
      { day:"Tue", type:"Cardio",  name:"Tempo Run",           duration:"35 min", intensity:"High",calories:320, exercises:["10 min warm-up","15 min tempo","10 min cool-down"] },
      { day:"Wed", type:"Weights", name:"Pull Strength",       duration:"50 min", intensity:"High",calories:310, exercises:["Barbell Row 4×8","Weighted Pull-Ups 3×8","Lat Pulldown 3×12","EZ Curl 3×12"] },
      { day:"Thu", type:"Cardio",  name:"Easy Jog",            duration:"30 min", intensity:"Low", calories:200, exercises:["30 min easy jog","Stretch thoroughly"] },
      { day:"Fri", type:"Weights", name:"Legs & Core",         duration:"50 min", intensity:"High",calories:320, exercises:["Front Squat 4×8","RDL 3×10","Step-Ups 3×10","Plank Circuit 3 rounds"] },
      { day:"Sat", type:"Hyrox",   name:"Hyrox Skills",        duration:"55 min", intensity:"High",calories:500, exercises:["Ski Erg 3×1km","Sled Push 4×25m","Sandbag Lunges 3×20m","2km run"] },
      { day:"Sun", type:"Rest",    name:"Rest",                duration:"–",      intensity:"–",   calories:0,   exercises:["Rest","Mobility","Sleep"] },
    ],
    3:[
      { day:"Mon", type:"Weights", name:"Push Hypertrophy",    duration:"55 min", intensity:"High",calories:320, exercises:["Bench Press 4×10","Incline Bench 3×12","Cable Fly 3×15","Overhead Tricep 3×15"] },
      { day:"Tue", type:"Cardio",  name:"Intervals",           duration:"40 min", intensity:"High",calories:380, exercises:["8×400m intervals","90s rest","Cool-down 10 min"] },
      { day:"Wed", type:"Weights", name:"Pull Hypertrophy",    duration:"55 min", intensity:"High",calories:330, exercises:["Deadlift 4×8","Chest-Supported Row 4×10","Pullover 3×12","Preacher Curl 3×12"] },
      { day:"Thu", type:"Cardio",  name:"Easy Run",            duration:"30 min", intensity:"Low", calories:200, exercises:["30 min easy","Foam roll"] },
      { day:"Fri", type:"Weights", name:"Legs Hypertrophy",    duration:"55 min", intensity:"High",calories:340, exercises:["Hack Squat 4×10","Leg Curl 4×12","Glute Bridge 4×12","Calf Raises 4×20"] },
      { day:"Sat", type:"Hyrox",   name:"Hyrox Challenge",     duration:"60 min", intensity:"Max", calories:580, exercises:["Full Hyrox simulation","Beat previous time"] },
      { day:"Sun", type:"Rest",    name:"Rest",                duration:"–",      intensity:"–",   calories:0,   exercises:["Rest","Stretch","Sleep"] },
    ],
    4:[
      { day:"Mon", type:"Weights", name:"Peak Push",           duration:"55 min", intensity:"High",calories:340, exercises:["Bench PR attempt","Back-off sets 3×8","OHP 3×10","Finisher"] },
      { day:"Tue", type:"Cardio",  name:"5K Test",             duration:"30 min", intensity:"Max", calories:380, exercises:["5K time trial","Record time","Cool-down"] },
      { day:"Wed", type:"Weights", name:"Peak Pull",           duration:"55 min", intensity:"High",calories:350, exercises:["Deadlift PR attempt","Weighted Pull-Ups 3×8","Row 3×10"] },
      { day:"Thu", type:"Cardio",  name:"Easy Recovery",       duration:"25 min", intensity:"Low", calories:160, exercises:["Easy jog","Light stretch"] },
      { day:"Fri", type:"Weights", name:"Full Body Finisher",  duration:"50 min", intensity:"High",calories:330, exercises:["Squat 4×8","Push-Pull superset 3×10","Core circuit"] },
      { day:"Sat", type:"Hyrox",   name:"Final Challenge",     duration:"60 min", intensity:"Max", calories:580, exercises:["Final Hyrox PR attempt","Celebrate your progress! ⚖️"] },
      { day:"Sun", type:"Rest",    name:"Programme Complete! 🎉",duration:"–",   intensity:"–",   calories:0,   exercises:["Rest & celebrate","Plan next 4 weeks"] },
    ],
  },
};

// ─── MEAL PLANS (4 weeks, keyed by goal) ─────────────────────────────────────
// Each week has 5 meals per day, each meal has a recipe
const MEALS = {
  weightLoss: {
    1: [
      { meal:"Breakfast", time:"7:00 AM", name:"Egg White Omelette", calories:320, protein:35,
        items:["4 egg whites + 1 whole egg","Spinach, mushrooms, peppers","1 slice Ezekiel bread","Black coffee"],
        recipe:{ prepTime:"10 min", cookTime:"10 min", serves:1, instructions:["Whisk egg whites and whole egg together with salt and pepper.","Heat a non-stick pan over medium heat with cooking spray.","Pour in eggs and swirl to coat the pan.","Add spinach, mushrooms and diced peppers to one half.","Fold omelette over and cook 2 min more until set.","Serve with toasted Ezekiel bread."], tip:"Prep veggies the night before to save morning time." }},
      { meal:"Snack",     time:"10:00 AM",name:"Protein Shake",      calories:180, protein:28,
        items:["1 scoop whey isolate","250ml unsweetened almond milk","1 tsp almond butter","Ice"],
        recipe:{ prepTime:"3 min", cookTime:"0 min", serves:1, instructions:["Add almond milk and ice to blender.","Add whey isolate and almond butter.","Blend 30 seconds until smooth.","Serve immediately."], tip:"Use cold almond milk for a creamier texture." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Chicken & Quinoa Bowl",calories:440,protein:45,
        items:["180g grilled chicken breast","80g quinoa (cooked)","Mixed greens & cucumber","Lemon vinaigrette"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Cook quinoa in low-sodium chicken stock for extra flavour — 1 cup liquid per ½ cup quinoa, ~15 min.","Season chicken with garlic powder, paprika, salt & pepper.","Grill or pan-fry chicken 6-7 min each side until cooked through.","Slice chicken and assemble over quinoa and greens.","Drizzle with lemon juice + 1 tsp olive oil dressing."], tip:"Batch cook quinoa for the week on Sunday." }},
      { meal:"Pre-Workout",time:"4:30 PM",name:"Greek Yogurt & Berries",calories:180,protein:20,
        items:["200g non-fat Greek yogurt","Handful blueberries","1 tbsp honey"],
        recipe:{ prepTime:"2 min", cookTime:"0 min", serves:1, instructions:["Spoon Greek yogurt into a bowl.","Top with blueberries.","Drizzle honey over the top.","Optionally add a sprinkle of granola (adds ~80 kcal)."], tip:"Freeze berries overnight for a cold, refreshing pre-workout." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Baked Salmon & Veg",  calories:480, protein:42,
        items:["200g salmon fillet","Broccoli & asparagus","100g sweet potato","Herbs & lemon"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Pre-heat oven to 200°C / 180°C fan.","Cube sweet potato, toss in 1 tsp olive oil, salt & cumin. Roast 20 min.","Place salmon on a lined tray. Season with dill, garlic, lemon zest, salt.","Add broccoli and asparagus around salmon.","Bake 15-18 min until salmon flakes and veg is tender.","Finish with a squeeze of fresh lemon."], tip:"Salmon is done when it flakes easily with a fork — don't overbake." }},
    ],
    2: [
      { meal:"Breakfast", time:"7:00 AM", name:"High-Protein Overnight Oats",calories:350,protein:32,
        items:["60g oats","1 scoop protein powder","200ml almond milk","½ banana, sliced","Chia seeds"],
        recipe:{ prepTime:"5 min (night before)", cookTime:"0 min", serves:1, instructions:["Mix oats, protein powder and almond milk in a jar.","Stir well until protein is dissolved.","Top with banana and chia seeds.","Cover and refrigerate overnight.","Eat cold in the morning — no heating needed!"], tip:"Make 3 jars on Sunday for an easy week of breakfasts." }},
      { meal:"Snack",     time:"10:00 AM",name:"Rice Cakes & Cottage Cheese",calories:160,protein:18,
        items:["2 plain rice cakes","100g low-fat cottage cheese","Sliced cucumber","Black pepper"],
        recipe:{ prepTime:"3 min", cookTime:"0 min", serves:1, instructions:["Spread cottage cheese evenly on rice cakes.","Layer cucumber slices on top.","Season with black pepper and optionally chilli flakes."], tip:"A surprisingly satisfying low-calorie snack — high in casein protein." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Turkey Lettuce Wraps",calories:390,protein:40,
        items:["150g lean ground turkey","Butter lettuce leaves","Diced tomato, onion","Low-sodium soy sauce","Lime juice"],
        recipe:{ prepTime:"5 min", cookTime:"15 min", serves:1, instructions:["Brown ground turkey in a pan over medium-high heat 8-10 min.","Add soy sauce, a pinch of garlic powder and lime juice. Cook 2 min.","Spoon turkey mixture into lettuce cups.","Top with diced tomato and onion.","Finish with extra lime squeeze."], tip:"Add sriracha for a metabolism-boosting kick." }},
      { meal:"Pre-Workout",time:"4:30 PM",name:"Apple & Almond Butter",calories:190,protein:5,
        items:["1 large apple","1.5 tbsp almond butter"],
        recipe:{ prepTime:"1 min", cookTime:"0 min", serves:1, instructions:["Slice apple into wedges.","Serve with almond butter for dipping."], tip:"Apple provides fast carbs; almond butter adds healthy fats and sustained energy." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Turkey Mince Stir-Fry", calories:460,protein:44,
        items:["180g lean turkey mince","Pak choi, broccoli, peppers","60g rice noodles","Ginger, garlic, tamari"],
        recipe:{ prepTime:"10 min", cookTime:"15 min", serves:1, instructions:["Cook rice noodles per packet, drain and set aside.","Heat wok over high heat. Cook turkey mince until browned, ~8 min.","Add minced ginger and garlic, stir-fry 1 min.","Add vegetables and tamari soy sauce, toss 3-4 min.","Add noodles and toss everything together.","Serve hot with chilli oil optionally."], tip:"High heat + quick cooking keeps veg crisp and nutritious." }},
    ],
    3: [
      { meal:"Breakfast", time:"7:00 AM", name:"Smoked Salmon Bagel",  calories:380,protein:34,
        items:["½ whole-grain bagel","100g smoked salmon","2 tbsp low-fat cream cheese","Capers & red onion","Dill"],
        recipe:{ prepTime:"5 min", cookTime:"2 min", serves:1, instructions:["Toast bagel half until golden.","Spread cream cheese evenly.","Layer smoked salmon on top.","Scatter capers and thinly sliced red onion.","Finish with fresh dill and a crack of black pepper."], tip:"Omega-3s from salmon reduce inflammation and support fat loss." }},
      { meal:"Snack",     time:"10:00 AM",name:"Edamame & Sea Salt",   calories:150,protein:14,
        items:["150g frozen edamame (shelled)","Pinch sea salt","Chilli flakes optional"],
        recipe:{ prepTime:"2 min", cookTime:"5 min", serves:1, instructions:["Boil edamame in salted water for 5 min.","Drain and season with sea salt and chilli flakes.","Eat warm or cold."], tip:"Edamame is one of the best plant-based complete proteins." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Tuna Niçoise Salad",   calories:420,protein:42,
        items:["1 can tuna in spring water","2 hard-boiled eggs","Green beans, cherry tomatoes","Black olives","Dijon mustard dressing"],
        recipe:{ prepTime:"10 min", cookTime:"10 min", serves:1, instructions:["Hard-boil eggs 8 min, peel and halve.","Blanch green beans in boiling water 3 min, drain.","Drain tuna and flake into a bowl.","Arrange all ingredients on a plate.","Whisk 1 tsp Dijon, 1 tsp olive oil, lemon juice for dressing."], tip:"Tuna in spring water keeps calories low without sacrificing protein." }},
      { meal:"Pre-Workout",time:"4:30 PM",name:"Banana & Protein Bar",calories:200,protein:18,
        items:["1 banana","1 low-calorie protein bar (<200 kcal)"],
        recipe:{ prepTime:"0 min", cookTime:"0 min", serves:1, instructions:["Eat banana first for fast-release carbs.","Follow with protein bar 10-15 min before workout."], tip:"Look for protein bars with <5g sugar and >15g protein." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Chicken Tikka Masala (Light)", calories:490,protein:46,
        items:["200g chicken breast","Low-fat Greek yogurt marinade","Tikka spice blend","Tomato passata","Cauliflower rice"],
        recipe:{ prepTime:"15 min + 1hr marinate", cookTime:"20 min", serves:1, instructions:["Cube chicken. Mix with 3 tbsp Greek yogurt, 2 tsp tikka spice, salt. Marinate 1 hour minimum.","Grill or bake marinated chicken at 200°C for 18-20 min.","Simmer 150ml passata with remaining tikka spices 5 min.","Add cooked chicken to sauce.","Serve over steamed cauliflower rice."], tip:"Cauliflower rice saves ~200 kcal vs white rice with no sacrifice in satisfaction." }},
    ],
    4: [
      { meal:"Breakfast", time:"7:00 AM", name:"Protein Pancakes",    calories:360,protein:36,
        items:["2 scoops whey protein","2 eggs","½ banana","1 tsp baking powder","Blueberries"],
        recipe:{ prepTime:"5 min", cookTime:"8 min", serves:1, instructions:["Blend protein powder, eggs and banana until smooth batter forms.","Add baking powder and mix briefly.","Heat pan with cooking spray on medium heat.","Pour small rounds onto pan, cook 2 min each side.","Stack and top with fresh blueberries — no syrup needed."], tip:"The riper the banana, the sweeter the pancakes naturally." }},
      { meal:"Snack",     time:"10:00 AM",name:"Boiled Eggs & Veggie Sticks",calories:140,protein:12,
        items:["2 hard-boiled eggs","Carrot & celery sticks","Mustard dip"],
        recipe:{ prepTime:"5 min", cookTime:"10 min", serves:1, instructions:["Boil eggs 10 min for hard-boiled. Cool in cold water.","Peel and season with salt and pepper.","Serve with cut vegetables and a small pot of mustard."], tip:"Prep a batch of 6 hard-boiled eggs on Monday for the whole week." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Prawn & Avocado Salad",calories:400,protein:36,
        items:["150g cooked king prawns","½ avocado","Mixed salad leaves","Cherry tomatoes","Lime & coriander dressing"],
        recipe:{ prepTime:"8 min", cookTime:"0 min", serves:1, instructions:["Arrange salad leaves in a bowl.","Halve cherry tomatoes and slice avocado.","Add prawns on top.","Mix lime juice, coriander, pinch of chilli for dressing.","Drizzle and serve immediately."], tip:"Avocado provides satiating healthy fats that reduce later cravings." }},
      { meal:"Pre-Workout",time:"4:30 PM",name:"Oatmeal & Honey",    calories:200,protein:6,
        items:["40g oats","1 tbsp honey","Pinch of cinnamon","Water"],
        recipe:{ prepTime:"2 min", cookTime:"5 min", serves:1, instructions:["Cook oats with water per packet (microwave 2 min or stovetop 5 min).","Stir in honey and cinnamon.","Eat 30-45 min before workout."], tip:"Oats are a slow-release carb ideal for sustained workout energy." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Lean Beef & Veggie Bowl",calories:500,protein:48,
        items:["180g extra-lean beef mince","Courgette, peppers, onion","100g brown rice","Smoked paprika & cumin"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Cook brown rice per packet (~20 min).","Brown beef mince in a hot pan over high heat, ~8 min.","Season with smoked paprika, cumin, garlic powder, salt.","Add diced veg and cook 5 min more until softened.","Serve beef mixture over rice."], tip:"Extra-lean mince (5% fat) dramatically cuts saturated fat vs regular mince." }},
    ],
  },
  muscleGain: {
    1: [
      { meal:"Breakfast", time:"7:00 AM", name:"Muscle Builder Oats",  calories:680,protein:52,
        items:["100g oats","2 scoops whey","1 banana","2 tbsp peanut butter","Whole milk 300ml"],
        recipe:{ prepTime:"5 min", cookTime:"5 min", serves:1, instructions:["Cook oats with whole milk on stovetop 5 min, stirring.","Remove from heat, stir in protein powder.","Top with sliced banana and peanut butter."], tip:"Whole milk adds quality calories and calcium for muscle function." }},
      { meal:"Mid-Morning",time:"10:30 AM",name:"Cottage Cheese & Rice Cakes",calories:300,protein:32,
        items:["200g low-fat cottage cheese","4 rice cakes","Sliced tomato"],
        recipe:{ prepTime:"3 min", cookTime:"0 min", serves:1, instructions:["Spread cottage cheese on rice cakes.","Top with sliced tomato and black pepper."], tip:"Cottage cheese is high in casein — slow-digesting protein ideal between meals." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Steak & Rice Power Bowl",calories:620,protein:55,
        items:["200g lean beef steak","150g white rice","Mixed veg stir-fry","Soy sauce & ginger"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Cook white rice per packet.","Season steak with salt, pepper and garlic.","Sear in hot pan 3-4 min each side for medium.","Rest 5 min, then slice.","Stir-fry veg with soy sauce and fresh ginger 4 min.","Serve steak over rice and veg."], tip:"White rice spikes insulin faster than brown rice — great post-workout." }},
      { meal:"Pre-Workout",time:"4:00 PM",name:"Bagel & Protein Shake", calories:420,protein:35,
        items:["1 whole-grain bagel","1 scoop protein","250ml milk"],
        recipe:{ prepTime:"3 min", cookTime:"2 min", serves:1, instructions:["Toast bagel.","Shake protein with milk in a shaker bottle.","Eat bagel, drink shake 30-45 min before training."], tip:"Pre-workout carbs + protein fuels performance and kickstarts muscle synthesis." }},
      { meal:"Dinner",    time:"7:30 PM", name:"Chicken Pasta",        calories:780,protein:58,
        items:["200g chicken thighs","120g pasta","Tomato & basil sauce","Parmesan"],
        recipe:{ prepTime:"5 min", cookTime:"25 min", serves:1, instructions:["Cook pasta in salted boiling water per packet.","Season chicken thighs generously and pan-fry 8 min each side until golden.","Heat tomato sauce in a separate pan with fresh basil.","Combine pasta and sauce, top with sliced chicken.","Grate parmesan generously on top."], tip:"Chicken thighs have more calories and iron than breasts — great for muscle gain." }},
    ],
    2: [
      { meal:"Breakfast", time:"7:00 AM", name:"Full Breakfast Stack",  calories:720,protein:54,
        items:["3 whole eggs + 2 whites","200g lean turkey bacon","2 slices sourdough","Avocado ½","Spinach"],
        recipe:{ prepTime:"5 min", cookTime:"15 min", serves:1, instructions:["Grill turkey bacon until crispy, ~8 min.","Scramble eggs in butter on medium heat.","Toast sourdough slices.","Wilt spinach in same pan 1 min.","Stack: toast → spinach → eggs → bacon → avocado slices."], tip:"This breakfast keeps you full for 4+ hours, reducing unnecessary snacking." }},
      { meal:"Mid-Morning",time:"10:30 AM",name:"Greek Yogurt Parfait", calories:340,protein:34,
        items:["200g full-fat Greek yogurt","40g granola","Mixed berries","Honey"],
        recipe:{ prepTime:"3 min", cookTime:"0 min", serves:1, instructions:["Layer Greek yogurt in a glass.","Add granola layer.","Top with mixed berries and honey drizzle."], tip:"Full-fat yogurt provides more calories and fat-soluble vitamins." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Pulled Chicken Wraps", calories:640,protein:56,
        items:["200g chicken breast","2 whole-grain wraps","Greek yogurt slaw","Avocado","Hot sauce"],
        recipe:{ prepTime:"10 min", cookTime:"25 min", serves:1, instructions:["Simmer chicken breast in water with garlic and salt 20 min.","Remove and shred with two forks.","Mix shredded cabbage with 2 tbsp Greek yogurt, lemon, salt for slaw.","Warm wraps. Fill with chicken, slaw, sliced avocado and hot sauce."], tip:"Pulled chicken stays juicy and is easy to meal prep in large batches." }},
      { meal:"Pre-Workout",time:"4:00 PM",name:"Banana & Peanut Butter Toast",calories:400,protein:14,
        items:["2 slices wholegrain bread","2 tbsp peanut butter","1 banana","Honey"],
        recipe:{ prepTime:"3 min", cookTime:"2 min", serves:1, instructions:["Toast bread slices.","Spread peanut butter thickly.","Slice banana on top.","Drizzle honey."], tip:"This classic combo gives fast + slow carbs for sustained workout power." }},
      { meal:"Dinner",    time:"7:30 PM", name:"Salmon & Potato Bake", calories:760,protein:56,
        items:["220g salmon fillet","200g baby potatoes","Green beans","Garlic butter","Dill"],
        recipe:{ prepTime:"10 min", cookTime:"25 min", serves:1, instructions:["Boil baby potatoes until just tender, ~15 min. Halve them.","Place salmon and potatoes on a baking tray.","Top everything with garlic butter (1 tbsp butter + garlic) and dill.","Roast at 200°C for 15-18 min.","Add green beans for last 8 min of cooking."], tip:"Baby potatoes are calorie-dense and great for replenishing muscle glycogen." }},
    ],
    3: [
      { meal:"Breakfast", time:"7:00 AM", name:"Protein French Toast",  calories:700,protein:50,
        items:["3 thick slices brioche","3 eggs + 1 scoop protein","100ml milk","Cinnamon","Maple syrup & berries"],
        recipe:{ prepTime:"5 min", cookTime:"10 min", serves:1, instructions:["Whisk eggs, protein powder, milk and cinnamon.","Soak brioche slices in egg mix 1 min each side.","Fry in buttered pan 2-3 min per side until golden.","Stack and top with berries and a small drizzle maple syrup."], tip:"Adding protein powder to the batter is a seamless way to hit your protein targets." }},
      { meal:"Mid-Morning",time:"10:30 AM",name:"Tuna & Crackers",      calories:280,protein:32,
        items:["1 can tuna (120g drained)","Whole-grain crackers 6","Dijon mustard","Lemon"],
        recipe:{ prepTime:"3 min", cookTime:"0 min", serves:1, instructions:["Mix tuna with Dijon mustard and squeeze of lemon.","Spoon onto crackers and serve."], tip:"Keep canned tuna in your gym bag for post-training protein on the go." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Beef Burrito Bowl",     calories:680,protein:58,
        items:["200g lean beef mince","130g Mexican rice","Black beans","Salsa, Greek yogurt (sub sour cream)","Jalapeños"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Cook rice with tomato paste and cumin for Mexican flavour.","Brown beef with garlic, cumin, smoked paprika, chilli powder.","Warm black beans.","Layer in a bowl: rice → beans → beef → salsa → Greek yogurt.","Top with jalapeños."], tip:"Greek yogurt is a perfect low-fat substitute for sour cream — same taste, double the protein." }},
      { meal:"Pre-Workout",time:"4:00 PM",name:"Oats & Protein Shake", calories:450,protein:38,
        items:["60g oats cooked","1 scoop protein shake","250ml milk","Handful of raisins"],
        recipe:{ prepTime:"5 min", cookTime:"5 min", serves:1, instructions:["Cook oats with milk.","Stir in raisins.","Prepare protein shake on the side.","Eat oats, drink shake together 45 min pre-workout."], tip:"Raisins are fast-release sugar — perfect for pre-workout carb loading." }},
      { meal:"Dinner",    time:"7:30 PM", name:"Lamb & Chickpea Stew", calories:800,protein:60,
        items:["200g lean lamb shoulder","150g canned chickpeas","Tomatoes, onion, garlic","Ras el hanout spice","Cous cous 80g"],
        recipe:{ prepTime:"15 min", cookTime:"30 min", serves:1, instructions:["Brown lamb pieces in a hot pot with a drizzle of oil.","Add diced onion and garlic, soften 3 min.","Add ras el hanout, stir 1 min.","Add chopped tomatoes and drained chickpeas.","Simmer covered 25 min until lamb is tender.","Serve over couscous."], tip:"Lamb is one of the richest natural sources of creatine and B12 for muscle function." }},
    ],
    4: [
      { meal:"Breakfast", time:"7:00 AM", name:"Smoked Salmon Omelette",calories:660,protein:58,
        items:["4 whole eggs","100g smoked salmon","Cream cheese 30g","Chives, capers","1 slice rye bread"],
        recipe:{ prepTime:"5 min", cookTime:"8 min", serves:1, instructions:["Beat eggs with salt and pepper.","Heat butter in pan, pour in eggs and cook slowly on low heat.","When almost set, add dollops of cream cheese and smoked salmon.","Fold omelette gently. Slide onto plate.","Garnish with chives and capers. Serve with rye bread."], tip:"Low-heat omelettes are silkier and more digestible — don't rush them." }},
      { meal:"Mid-Morning",time:"10:30 AM",name:"PB & Protein Smoothie",calories:380,protein:36,
        items:["1 scoop whey","1 tbsp peanut butter","1 banana","200ml whole milk","Ice"],
        recipe:{ prepTime:"3 min", cookTime:"0 min", serves:1, instructions:["Add all ingredients to blender.","Blend until smooth.","Drink immediately."], tip:"Whole milk adds an easy 150 extra calories for hard gainers." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Chicken Caesar Salad", calories:620,protein:54,
        items:["220g grilled chicken breast","Romaine lettuce","Parmesan","Whole-grain croutons","Light Caesar dressing"],
        recipe:{ prepTime:"10 min", cookTime:"15 min", serves:1, instructions:["Grill seasoned chicken breast 7 min each side.","Chop romaine lettuce into large pieces.","Toss with Caesar dressing.","Top with sliced chicken, croutons and shaved parmesan."], tip:"Ask for dressing on the side to control your calorie intake." }},
      { meal:"Pre-Workout",time:"4:00 PM",name:"Rice & Egg Whites",    calories:420,protein:40,
        items:["100g cooked rice","6 egg whites","Soy sauce","Sesame oil"],
        recipe:{ prepTime:"5 min", cookTime:"10 min", serves:1, instructions:["Scramble egg whites in a hot wok with sesame oil.","Add cooked rice and stir fry together.","Season with soy sauce.","Eat 30-40 min pre-workout."], tip:"This athlete classic provides lean protein + fast carbs with minimal fat." }},
      { meal:"Dinner",    time:"7:30 PM", name:"Pesto Chicken & Gnocchi",calories:820,protein:62,
        items:["220g chicken breast","180g gnocchi","Basil pesto 40g","Cherry tomatoes","Parmesan"],
        recipe:{ prepTime:"5 min", cookTime:"20 min", serves:1, instructions:["Cook gnocchi in salted boiling water until they float (~3 min). Drain.","Pan-fry chicken breast 7 min each side until cooked.","Slice and toss with gnocchi and pesto.","Add halved cherry tomatoes.","Plate and top with parmesan."], tip:"Gnocchi is calorie-dense carb heaven — great for post-training muscle glycogen refuelling." }},
    ],
  },
  endurance: {
    1:[
      { meal:"Breakfast", time:"6:30 AM", name:"Carb-Loaded Oats",    calories:560,protein:30,
        items:["100g oats","1 banana","1 scoop protein","Orange juice 200ml","Honey"],
        recipe:{ prepTime:"5 min", cookTime:"5 min", serves:1, instructions:["Cook oats with water.","Stir in protein powder.","Top with sliced banana and honey.","Drink OJ alongside."], tip:"OJ provides fast-absorbing fructose — great for topping up liver glycogen before training." }},
      { meal:"Mid-Morning",time:"10:00 AM",name:"Energy Snack",       calories:220,protein:6,
        items:["2 rice cakes","1 tbsp almond butter","1 apple"],
        recipe:{ prepTime:"2 min", cookTime:"0 min", serves:1, instructions:["Spread almond butter on rice cakes.","Eat with apple."], tip:"Simple, effective mid-morning fuel — nothing complex needed." }},
      { meal:"Lunch",     time:"12:30 PM",name:"Tuna Sweet Potato",   calories:460,protein:44,
        items:["180g tuna (canned in water)","1 large sweet potato","Salad leaves","Olive oil dressing"],
        recipe:{ prepTime:"5 min", cookTime:"25 min", serves:1, instructions:["Bake sweet potato whole at 200°C for 45 min or microwave 8-10 min.","Drain tuna and mix with black pepper and lemon.","Split potato open, pile tuna on top.","Serve with side salad and olive oil dressing."], tip:"Sweet potato is an endurance athlete's best friend — slow-release energy for long sessions." }},
      { meal:"Pre-Workout",time:"4:00 PM",name:"Banana & Energy Gel", calories:260,protein:4,
        items:["2 bananas","1 energy gel or sports drink"],
        recipe:{ prepTime:"0 min", cookTime:"0 min", serves:1, instructions:["Eat both bananas 45 min before session.","Take energy gel 10 min before or at start of workout."], tip:"Bananas are nature's energy gel — portable, natural, and perfectly balanced." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Salmon Pasta Recovery",calories:700,protein:46,
        items:["180g salmon fillet","120g wholegrain pasta","Pesto sauce 30g","Cherry tomatoes","Rocket"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Cook pasta in salted boiling water per packet.","Pan-fry or grill salmon skin-side down 4 min, flip 2 min.","Drain pasta, stir in pesto.","Break salmon into chunks over pasta.","Add halved cherry tomatoes and rocket."], tip:"Wholegrain pasta releases carbs slowly — perfect for overnight glycogen replenishment." }},
    ],
    2:[
      { meal:"Breakfast", time:"6:30 AM", name:"Chia Pudding Parfait", calories:500,protein:28,
        items:["4 tbsp chia seeds","300ml almond milk","1 scoop protein","Mango chunks","Granola"],
        recipe:{ prepTime:"5 min + overnight", cookTime:"0 min", serves:1, instructions:["Mix chia seeds, almond milk and protein powder.","Refrigerate overnight until thick.","In morning, layer chia pudding with mango and granola."], tip:"Chia seeds provide omega-3s and slow-release carbs — ideal for endurance athletes." }},
      { meal:"Mid-Morning",time:"10:00 AM",name:"Dates & Almonds",    calories:200,protein:5,
        items:["6 Medjool dates","20g almonds"],
        recipe:{ prepTime:"1 min", cookTime:"0 min", serves:1, instructions:["Eat dates and almonds together."], tip:"Dates are one of the highest natural sources of fast-release carbohydrates." }},
      { meal:"Lunch",     time:"12:30 PM",name:"Chicken & Couscous Salad",calories:490,protein:42,
        items:["170g chicken breast","80g couscous","Roasted peppers, courgette","Lemon & herb dressing","Feta 30g"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Pour boiling water over couscous (1:1.5 ratio), cover 5 min, fluff with fork.","Season and grill chicken 6-7 min each side.","Roast peppers and courgette at 200°C for 15 min.","Combine couscous, veg, sliced chicken.","Crumble feta on top, drizzle lemon dressing."], tip:"Couscous is one of the fastest-cooking carbs — ready in 5 minutes." }},
      { meal:"Pre-Workout",time:"4:00 PM",name:"Sports Drink & Bar",  calories:280,protein:10,
        items:["1 sports drink 500ml","1 low-sugar cereal bar"],
        recipe:{ prepTime:"0 min", cookTime:"0 min", serves:1, instructions:["Drink half the sports drink 30 min before session.","Eat cereal bar 20 min before.","Drink remaining sports drink during session."], tip:"Sports drinks provide electrolytes that improve performance in sessions over 60 min." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Turkey & Sweet Potato Curry",calories:620,protein:50,
        items:["200g turkey breast","1 large sweet potato","Coconut milk light 200ml","Curry spices","Brown rice 80g"],
        recipe:{ prepTime:"10 min", cookTime:"25 min", serves:1, instructions:["Cook brown rice per packet.","Cube sweet potato and simmer in coconut milk with curry paste 15 min.","Add diced turkey and cook 10 min more.","Season with cumin, coriander, salt.","Serve curry over brown rice."], tip:"Light coconut milk keeps the calories manageable while delivering creaminess and flavour." }},
    ],
    3:[
      { meal:"Breakfast", time:"6:30 AM", name:"Banana Protein Smoothie Bowl",calories:520,protein:32,
        items:["2 frozen bananas","1 scoop protein","150ml almond milk","Granola, hemp seeds, berries"],
        recipe:{ prepTime:"5 min", cookTime:"0 min", serves:1, instructions:["Blend frozen bananas, protein and almond milk until thick.","Pour into bowl — should be thick, not liquid.","Top with granola, hemp seeds and fresh berries."], tip:"Frozen bananas create a thick, ice cream-like base — no ice cream needed." }},
      { meal:"Mid-Morning",time:"10:00 AM",name:"Hummus & Pitta",     calories:240,protein:8,
        items:["½ whole-wheat pitta","4 tbsp hummus","Cucumber, carrot sticks"],
        recipe:{ prepTime:"2 min", cookTime:"0 min", serves:1, instructions:["Warm pitta in toaster.","Serve with hummus and raw veg sticks."], tip:"Hummus is made from chickpeas — a great source of plant protein and slow carbs." }},
      { meal:"Lunch",     time:"12:30 PM",name:"Prawn Fried Rice",    calories:480,protein:38,
        items:["150g king prawns","120g cooked brown rice","Edamame, sweetcorn","2 eggs","Tamari sauce"],
        recipe:{ prepTime:"5 min", cookTime:"10 min", serves:1, instructions:["Heat wok until smoking. Add sesame oil.","Scramble eggs in wok, push to side.","Add prawns and cook 2 min.","Add rice, edamame and sweetcorn. Stir-fry 3 min.","Season with tamari."], tip:"Day-old rice fries better than freshly cooked — don't skip this step." }},
      { meal:"Pre-Workout",time:"4:00 PM",name:"Toast & Jam",         calories:250,protein:6,
        items:["2 slices white bread","2 tbsp jam","1 glass apple juice"],
        recipe:{ prepTime:"2 min", cookTime:"2 min", serves:1, instructions:["Toast bread.","Spread generously with jam.","Drink apple juice alongside.","Eat 30 min before workout."], tip:"Simple fast-release carbs 30 min pre-run significantly improve pace." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Beef & Lentil Stew",  calories:640,protein:52,
        items:["180g lean beef","150g green lentils","Carrots, celery, onion","Beef stock","Thyme & bay leaf"],
        recipe:{ prepTime:"10 min", cookTime:"35 min", serves:1, instructions:["Brown beef pieces in pot with oil.","Add diced vegetables, soften 5 min.","Add lentils, stock, thyme and bay leaf.","Simmer 30 min until lentils are tender and beef is cooked.","Season and serve hot."], tip:"Lentils are a powerhouse of complex carbs + plant protein — perfect recovery food." }},
    ],
    4:[
      { meal:"Breakfast", time:"6:30 AM", name:"Race Day Oats",       calories:580,protein:32,
        items:["100g oats","2 tbsp honey","1 banana","Almond butter","Oat milk 250ml"],
        recipe:{ prepTime:"5 min", cookTime:"5 min", serves:1, instructions:["Cook oats in oat milk.","Stir in honey while hot.","Slice banana on top, add almond butter.","Eat 90 min before any race or hard effort."], tip:"This is a proven race morning breakfast — eat it 90 min pre-race for optimal digestion." }},
      { meal:"Mid-Morning",time:"10:00 AM",name:"Energy Balls",       calories:220,protein:8,
        items:["3 homemade energy balls (oats, PB, honey, chocolate chips)"],
        recipe:{ prepTime:"10 min (batch)", cookTime:"0 min", serves:3, instructions:["Mix 100g oats, 60g peanut butter, 3 tbsp honey, 30g dark choc chips.","Roll into 12 balls.","Refrigerate 30 min to set.","Store in fridge up to 1 week."], tip:"Batch make on Sunday — you'll have snacks for the whole week." }},
      { meal:"Lunch",     time:"12:30 PM",name:"Mackerel & Rice Bowl", calories:510,protein:44,
        items:["1 smoked mackerel fillet","120g brown rice","Pickled cucumber","Spring onion","Soy sauce"],
        recipe:{ prepTime:"5 min", cookTime:"20 min", serves:1, instructions:["Cook brown rice per packet.","Flake smoked mackerel over hot rice.","Add pickled cucumber (thin slices in rice vinegar + sugar).","Top with sliced spring onion and soy sauce."], tip:"Smoked mackerel is omega-3-rich and requires zero cooking — great for quick lunches." }},
      { meal:"Pre-Workout",time:"4:00 PM",name:"Gels & Banana",       calories:260,protein:4,
        items:["2 bananas","2 energy gels"],
        recipe:{ prepTime:"0 min", cookTime:"0 min", serves:1, instructions:["Eat bananas 45 min before start.","Take gel 5 min before or at race start.","Hydrate with water throughout."], tip:"Your final week fuelling is critical — don't try anything new." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Chicken & Rice Power Dinner",calories:680,protein:56,
        items:["220g chicken breast","150g white rice","Steamed broccoli","Teriyaki glaze","Sesame seeds"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Cook white rice per packet.","Marinate chicken in teriyaki sauce 10 min.","Grill or bake chicken at 200°C 18-20 min.","Steam broccoli 5 min.","Slice chicken, serve over rice and broccoli.","Sprinkle sesame seeds."], tip:"White rice in week 4 is intentional — it absorbs faster and maximises glycogen storage pre-race." }},
    ],
  },
  maintenance: {
    1:[
      { meal:"Breakfast", time:"7:30 AM", name:"Balanced Breakfast",  calories:480,protein:24,
        items:["2 scrambled eggs","2 slices wholegrain toast","½ avocado","Orange juice"],
        recipe:{ prepTime:"5 min", cookTime:"5 min", serves:1, instructions:["Scramble eggs in butter on low heat — slow and creamy.","Toast bread.","Mash avocado with lemon, salt and pepper.","Serve together with a glass of OJ."], tip:"Slow-scrambled eggs on low heat are creamier and more satisfying." }},
      { meal:"Mid-Morning",time:"10:30 AM",name:"Protein Yogurt",     calories:260,protein:18,
        items:["150g Greek yogurt","30g mixed nuts","Honey drizzle"],
        recipe:{ prepTime:"2 min", cookTime:"0 min", serves:1, instructions:["Add yogurt to bowl.","Top with mixed nuts and honey."], tip:"Mixed nuts provide heart-healthy fats and help with long-term satiety." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Chicken Wrap",        calories:480,protein:38,
        items:["150g chicken breast","1 whole-wheat wrap","Hummus","Lettuce, tomato, cucumber"],
        recipe:{ prepTime:"10 min", cookTime:"15 min", serves:1, instructions:["Grill seasoned chicken breast 7 min each side.","Slice chicken.","Warm wrap briefly.","Spread hummus, layer chicken and fresh veg.","Roll and slice in half."], tip:"Hummus instead of mayo cuts saturated fat while adding plant protein." }},
      { meal:"Snack",     time:"4:30 PM", name:"Apple & Peanut Butter",calories:220,protein:7,
        items:["1 large apple","2 tbsp peanut butter"],
        recipe:{ prepTime:"1 min", cookTime:"0 min", serves:1, instructions:["Slice apple.","Serve with peanut butter for dipping."], tip:"This classic snack balances natural sugar with satiating fat and protein." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Lean Beef Stir-Fry",  calories:560,protein:42,
        items:["180g lean beef strips","100g brown rice","Mixed vegetables","Teriyaki sauce"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Cook brown rice.","Stir-fry beef in hot wok 4-5 min.","Add vegetables and teriyaki sauce.","Toss together and serve over rice."], tip:"Slice beef thinly against the grain for tenderness." }},
    ],
    2:[
      { meal:"Breakfast", time:"7:30 AM", name:"Veggie Frittata",     calories:420,protein:26,
        items:["3 eggs","Peppers, onion, courgette","Feta 30g","1 slice sourdough"],
        recipe:{ prepTime:"8 min", cookTime:"15 min", serves:1, instructions:["Preheat oven to 180°C.","Sauté veg in oven-safe pan 5 min.","Beat eggs, pour over veg.","Crumble feta on top.","Cook stovetop 2 min, then transfer to oven 8 min until set.","Serve with sourdough."], tip:"Frittatas keep well in the fridge for 3 days — make a larger batch." }},
      { meal:"Mid-Morning",time:"10:30 AM",name:"Fruit & Cheese",     calories:240,protein:14,
        items:["80g low-fat cheddar","1 pear","5 whole-grain crackers"],
        recipe:{ prepTime:"2 min", cookTime:"0 min", serves:1, instructions:["Slice cheese and pear.","Serve with crackers."], tip:"Cheese + fruit is a balanced snack combining protein, fat and natural sugar." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Lentil & Feta Salad", calories:460,protein:26,
        items:["150g cooked green lentils","Feta 50g","Sun-dried tomatoes","Rocket","Balsamic vinaigrette"],
        recipe:{ prepTime:"5 min", cookTime:"0 min (using canned lentils)", serves:1, instructions:["Drain and rinse canned lentils.","Combine with rocket, sun-dried tomatoes.","Crumble feta on top.","Dress with balsamic vinaigrette."], tip:"Canned lentils are a brilliant time-saver — nutritionally identical to dried." }},
      { meal:"Snack",     time:"4:30 PM", name:"Smoothie",            calories:250,protein:10,
        items:["1 banana","150g frozen mango","1 tbsp hemp seeds","200ml coconut water"],
        recipe:{ prepTime:"3 min", cookTime:"0 min", serves:1, instructions:["Blend all ingredients until smooth.","Drink immediately."], tip:"Hemp seeds are a complete protein source — perfect for vegetarians." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Cod & Roasted Veg",   calories:480,protein:44,
        items:["220g cod fillet","Tomatoes, courgette, red onion","Olive oil","Capers & lemon","Crusty bread"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Dice veg and toss with olive oil and salt. Roast 15 min at 200°C.","Place cod on top of veg. Season with capers, lemon, dill.","Roast 12-15 min until cod is opaque and flakes.","Serve with a small piece of crusty bread."], tip:"Cod is one of the leanest white fish — nearly zero fat with excellent protein." }},
    ],
    3:[
      { meal:"Breakfast", time:"7:30 AM", name:"Açaí Bowl",           calories:460,protein:20,
        items:["2 açaí packets (frozen)","½ banana","Mixed berries","Granola","Coconut flakes"],
        recipe:{ prepTime:"5 min", cookTime:"0 min", serves:1, instructions:["Blend frozen açaí with banana until thick.","Pour into bowl.","Top with berries, granola and coconut flakes."], tip:"Açaí is extremely high in antioxidants — great for recovery and inflammation." }},
      { meal:"Mid-Morning",time:"10:30 AM",name:"Boiled Eggs & Hummus",calories:220,protein:16,
        items:["2 boiled eggs","3 tbsp hummus","Carrot sticks"],
        recipe:{ prepTime:"2 min", cookTime:"10 min", serves:1, instructions:["Boil eggs 10 min for hard-boiled.","Peel and halve.","Serve with hummus and carrot sticks."], tip:"Prep a batch of boiled eggs at start of week for quick grab-and-go snacks." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Prawn Tacos",         calories:480,protein:34,
        items:["150g tiger prawns","2 corn tortillas","Avocado","Lime slaw","Sriracha"],
        recipe:{ prepTime:"10 min", cookTime:"5 min", serves:1, instructions:["Season prawns with cumin, chilli, garlic. Pan-fry 2-3 min.","Shred cabbage and mix with lime juice and Greek yogurt for slaw.","Warm tortillas in dry pan.","Assemble: slaw → prawns → avocado → sriracha."], tip:"Corn tortillas have fewer calories than flour — and they taste better with seafood." }},
      { meal:"Snack",     time:"4:30 PM", name:"Trail Mix",           calories:240,protein:8,
        items:["20g almonds","20g walnuts","20g dark chocolate chips","Dried cranberries 20g"],
        recipe:{ prepTime:"2 min", cookTime:"0 min", serves:1, instructions:["Mix all ingredients in a small bag.","Snack throughout the afternoon or pre/post workout."], tip:"Make a week's worth at once and portion into bags for easy grabbing." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Chicken & Mushroom Risotto",calories:580,protein:46,
        items:["180g chicken breast","100g arborio rice","Mushrooms, onion","Low-sodium chicken stock","Parmesan"],
        recipe:{ prepTime:"10 min", cookTime:"30 min", serves:1, instructions:["Sauté diced onion 3 min. Add mushrooms 3 min more.","Add arborio rice, toast 1 min.","Add warm stock ladle by ladle, stirring until absorbed each time (~25 min).","Grill chicken separately, slice and serve on top.","Finish risotto with parmesan."], tip:"Good risotto requires patience — constant stirring releases starch for creaminess." }},
    ],
    4:[
      { meal:"Breakfast", time:"7:30 AM", name:"Classic Full Breakfast",calories:500,protein:30,
        items:["2 eggs (any style)","Turkey sausages 2","Baked beans 100g","2 slices wholegrain toast","Grilled tomato"],
        recipe:{ prepTime:"5 min", cookTime:"15 min", serves:1, instructions:["Grill sausages 12-15 min, turning occasionally.","Fry or scramble eggs to your preference.","Heat baked beans in a small pan.","Toast bread. Grill tomato halves 5 min.","Plate everything together."], tip:"Turkey sausages have ~40% fewer calories than pork sausages with similar taste." }},
      { meal:"Mid-Morning",time:"10:30 AM",name:"Protein Shake & Banana",calories:260,protein:28,
        items:["1 scoop whey isolate","250ml water or milk","1 banana"],
        recipe:{ prepTime:"2 min", cookTime:"0 min", serves:1, instructions:["Shake protein with water or milk.","Eat banana alongside."], tip:"Week 4 — keep it simple and consistent. Don't overcomplicate final week nutrition." }},
      { meal:"Lunch",     time:"1:00 PM", name:"Grilled Chicken & Roasted Veg Pasta",calories:540,protein:46,
        items:["180g chicken breast","100g penne pasta","Roasted peppers & courgette","Pesto 25g","Parmesan"],
        recipe:{ prepTime:"10 min", cookTime:"25 min", serves:1, instructions:["Cook pasta per packet.","Roast diced veg at 200°C for 15 min.","Grill chicken, slice.","Toss pasta, veg and pesto together.","Top with chicken and parmesan."], tip:"This dish works hot or cold — make extra for tomorrow's lunch." }},
      { meal:"Snack",     time:"4:30 PM", name:"Yogurt & Mixed Seeds", calories:220,protein:16,
        items:["150g Greek yogurt","1 tbsp pumpkin seeds","1 tbsp sunflower seeds","1 tsp honey"],
        recipe:{ prepTime:"2 min", cookTime:"0 min", serves:1, instructions:["Spoon yogurt into bowl.","Top with seeds and honey."], tip:"Seeds provide zinc and magnesium — both critical for testosterone and recovery." }},
      { meal:"Dinner",    time:"7:00 PM", name:"Celebration Salmon Dinner",calories:580,protein:50,
        items:["220g salmon fillet","100g new potatoes","Green beans","Hollandaise (light) 30g","Lemon"],
        recipe:{ prepTime:"10 min", cookTime:"20 min", serves:1, instructions:["Boil new potatoes ~15 min until tender.","Pan-sear salmon skin-side down in butter 4 min, flip 2 min.","Steam green beans 4 min.","Plate potatoes, beans and salmon.","Drizzle light hollandaise and squeeze lemon.","You've earned this — enjoy! 🎉"], tip:"Week 4 complete. This is your celebration meal — savour it." }},
    ],
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const intensityColor = { "Low":"#00C896","Med":"#4F8EF7","Medium":"#4F8EF7","Mixed":"#A259FF","High":"#FF6B35","Very High":"#FF2D55","Max":"#FF2D55","–":"#444" };
const typeIcon = { "Weights":"🏋️","Cardio":"🏃","Hyrox":"⚡","Active Rest":"🧘","Rest":"😴" };

export default function FitnessApp() {
  const [goal, setGoal]           = useState("weightLoss");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDay, setSelectedDay]   = useState(0);
  const [currentWeek, setCurrentWeek]   = useState(1);
  const [completedWorkouts, setCompleted] = useState(new Set());
  const [recipeOpen, setRecipeOpen]     = useState(null); // index of meal with open recipe
  const [expandedMeal, setExpandedMeal] = useState(null);

  const g       = GOALS[goal];
  const workouts = WORKOUTS[goal][currentWeek];
  const meals    = MEALS[goal][currentWeek];
  const weeklyBurn = workouts.reduce((s,w)=>s+w.calories,0);
  const completedCount = completedWorkouts.size;
  const progressPct = Math.round((completedCount/28)*100);

  const changeGoal = (ng) => { setGoal(ng); setCompleted(new Set()); };
  const toggleWorkout = (key) => {
    setCompleted(prev=>{ const n=new Set(prev); n.has(key)?n.delete(key):n.add(key); return n; });
  };

  const currentWorkout = workouts[selectedDay];
  const totalCal  = meals.reduce((s,m)=>s+m.calories,0);
  const totalProt = meals.reduce((s,m)=>s+m.protein,0);

  return (
    <div style={{ minHeight:"100vh", background:"#080810", fontFamily:"'DM Sans','Helvetica Neue',sans-serif", color:"#EEEEF5", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#222;border-radius:2px}
        .btn{transition:all .18s ease;cursor:pointer}
        .btn:hover{filter:brightness(1.15);transform:translateY(-1px)}
        .card{transition:transform .2s ease}
        .card:hover{transform:translateY(-2px)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeUp .35s ease forwards}
        @keyframes shimmer{0%,100%{opacity:.6}50%{opacity:1}}
        .shimmer{animation:shimmer 2s infinite}
        .recipe-panel{animation:fadeUp .25s ease forwards}
      `}</style>

      {/* HEADER */}
      <div style={{ background:"#0C0C18", borderBottom:"1px solid #1A1A2E", padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:200, backdropFilter:"blur(24px)" }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:3, lineHeight:1 }}>
            <span style={{ color:g.color }}>FORGE</span><span>FIT</span>
          </div>
          <div style={{ fontSize:10, color:"#555", letterSpacing:"3px", textTransform:"uppercase", marginTop:1 }}>4-Week Programme</div>
        </div>
        {/* Goal pills */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"flex-end" }}>
          {Object.entries(GOALS).map(([k,v])=>(
            <button key={k} onClick={()=>changeGoal(k)} className="btn" style={{ padding:"6px 16px", borderRadius:20, border:`1.5px solid ${goal===k?v.color:"#222"}`, background:goal===k?`${v.color}22`:"transparent", color:goal===k?v.color:"#666", fontSize:12, fontWeight:600 }}>
              {v.icon} {v.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px 60px" }}>

        {/* STATS */}
        <div className="fade" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginTop:28 }}>
          {[
            { label:"Daily Target",   val:g.calories.toLocaleString(), sub:"kcal", icon:"🔥" },
            { label:"Daily Protein",  val:`${g.protein}g`,            sub:"target", icon:"🥩" },
            { label:"Weekly Burn",    val:weeklyBurn.toLocaleString(), sub:"kcal/week", icon:"⚡" },
            { label:"Programme",      val:`${progressPct}%`,          sub:`${completedCount}/28 done`, icon:"📈" },
          ].map((s,i)=>(
            <div key={i} className="card" style={{ background:"linear-gradient(135deg,#11111E,#0D0D18)", border:"1px solid #1A1A2E", borderRadius:16, padding:"18px 20px" }}>
              <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, color:g.color, letterSpacing:1 }}>{s.val}</div>
              <div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:"1px", marginTop:1 }}>{s.sub}</div>
              <div style={{ fontSize:13, color:"#aaa", marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* WEEK SELECTOR + TABS */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:26, flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ fontSize:11, color:"#555", letterSpacing:"2px" }}>WEEK</span>
            {[1,2,3,4].map(w=>(
              <button key={w} onClick={()=>setCurrentWeek(w)} className="btn" style={{ width:38, height:38, borderRadius:10, border:`2px solid ${currentWeek===w?g.color:"#1A1A2E"}`, background:currentWeek===w?`${g.color}22`:"#11111E", color:currentWeek===w?g.color:"#666", fontWeight:700, fontSize:14 }}>{w}</button>
            ))}
          </div>
          <div style={{ background:"#11111E", border:"1px solid #1A1A2E", borderRadius:30, padding:"5px 16px", fontSize:12, color:"#666", marginLeft:"auto" }}>
            <span style={{ color:g.color, fontWeight:700 }}>{completedCount}</span> sessions completed
          </div>
        </div>

        {/* TABS */}
        <div style={{ display:"flex", gap:4, marginTop:18, background:"#11111E", borderRadius:12, padding:4, width:"fit-content", border:"1px solid #1A1A2E" }}>
          {[["overview","📋 Overview"],["workouts","🏋️ Workouts"],["meals","🥗 Meal Plan"]].map(([t,l])=>(
            <button key={t} onClick={()=>setActiveTab(t)} className="btn" style={{ padding:"8px 22px", borderRadius:8, border:"none", background:activeTab===t?g.color:"transparent", color:activeTab===t?"#fff":"#666", fontSize:13, fontWeight:600 }}>{l}</button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab==="overview" && (
          <div className="fade" style={{ marginTop:22, display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {/* Goal card */}
            <div style={{ background:`linear-gradient(135deg,${g.color}18,${g.color}06)`, border:`1px solid ${g.color}44`, borderRadius:16, padding:26 }}>
              <div style={{ fontSize:46, marginBottom:10 }}>{g.icon}</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:g.color, letterSpacing:2 }}>{g.label}</div>
              <div style={{ color:"#aaa", fontSize:14, marginTop:4 }}>{g.description}</div>
              <div style={{ display:"flex", gap:24, marginTop:20 }}>
                <div><div style={{ fontSize:22, fontWeight:700 }}>{g.calories}</div><div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:1 }}>kcal/day</div></div>
                <div><div style={{ fontSize:22, fontWeight:700 }}>{g.protein}g</div><div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:1 }}>protein/day</div></div>
                <div><div style={{ fontSize:22, fontWeight:700 }}>{weeklyBurn}</div><div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:1 }}>kcal/week burn</div></div>
              </div>
            </div>

            {/* Progress */}
            <div style={{ background:"#11111E", border:"1px solid #1A1A2E", borderRadius:16, padding:26 }}>
              <div style={{ fontSize:13, fontWeight:600, color:"#888", textTransform:"uppercase", letterSpacing:1, marginBottom:18 }}>Programme Progress</div>
              {[1,2,3,4].map(w=>{
                const wc = [...completedWorkouts].filter(k=>k.startsWith(`w${w}`)).length;
                return (
                  <div key={w} style={{ marginBottom:16 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontSize:12, color:currentWeek===w?g.color:"#888", fontWeight:currentWeek===w?700:400 }}>Week {w}</span>
                      <span style={{ fontSize:12, color:"#555" }}>{wc}/7</span>
                    </div>
                    <div style={{ height:6, background:"#1A1A2E", borderRadius:3 }}>
                      <div style={{ height:"100%", width:`${Math.round(wc/7*100)}%`, background:g.color, borderRadius:3, transition:"width .4s ease" }}/>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Week at a glance */}
            <div style={{ gridColumn:"1/-1", background:"#11111E", border:"1px solid #1A1A2E", borderRadius:16, padding:24 }}>
              <div style={{ fontSize:13, fontWeight:600, color:"#888", textTransform:"uppercase", letterSpacing:1, marginBottom:18 }}>Week {currentWeek} at a Glance</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:10 }}>
                {workouts.map((w,i)=>{
                  const key=`w${currentWeek}d${i}`;
                  const done=completedWorkouts.has(key);
                  return (
                    <div key={i} onClick={()=>{setSelectedDay(i);setActiveTab("workouts");}} className="card btn" style={{ background:done?`${g.color}22`:"#0D0D18", border:`1.5px solid ${done?g.color:"#1A1A2E"}`, borderRadius:12, padding:"14px 8px", textAlign:"center" }}>
                      <div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:1 }}>{w.day}</div>
                      <div style={{ fontSize:24, margin:"8px 0" }}>{done?"✅":typeIcon[w.type]}</div>
                      <div style={{ fontSize:10, color:"#aaa", fontWeight:600 }}>{w.type}</div>
                      <div style={{ fontSize:9, color:"#555", marginTop:3 }}>{w.duration}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── WORKOUTS ── */}
        {activeTab==="workouts" && (
          <div className="fade" style={{ marginTop:22, display:"grid", gridTemplateColumns:"250px 1fr", gap:16 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {workouts.map((w,i)=>{
                const key=`w${currentWeek}d${i}`;
                const done=completedWorkouts.has(key);
                const sel=selectedDay===i;
                return (
                  <div key={i} onClick={()=>setSelectedDay(i)} className="btn" style={{ background:sel?`${g.color}22`:"#11111E", border:`1.5px solid ${sel?g.color:done?`${g.color}44`:"#1A1A2E"}`, borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:18 }}>{done?"✅":typeIcon[w.type]}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:sel?g.color:"#ddd" }}>{w.day} — {w.name}</div>
                      <div style={{ fontSize:10, color:"#555", marginTop:2 }}>{w.duration} · {w.type}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background:"#11111E", border:"1px solid #1A1A2E", borderRadius:16, padding:28 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
                <div>
                  <div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:"2px" }}>Week {currentWeek} · {currentWorkout.day}</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:2, marginTop:4 }}>
                    {typeIcon[currentWorkout.type]} {currentWorkout.name}
                  </div>
                </div>
                <button onClick={()=>toggleWorkout(`w${currentWeek}d${selectedDay}`)} className="btn" style={{ padding:"10px 22px", borderRadius:10, border:"none", background:completedWorkouts.has(`w${currentWeek}d${selectedDay}`)?`${g.color}44`:g.color, color:"#fff", fontSize:13, fontWeight:700 }}>
                  {completedWorkouts.has(`w${currentWeek}d${selectedDay}`)?"✅ Completed":"Mark Complete"}
                </button>
              </div>

              <div style={{ display:"flex", gap:12, marginBottom:24 }}>
                {[
                  { label:"Duration",  val:currentWorkout.duration },
                  { label:"Intensity", val:currentWorkout.intensity, col:intensityColor[currentWorkout.intensity] },
                  { label:"Est. Burn", val:currentWorkout.calories?`${currentWorkout.calories} kcal`:"–" },
                  { label:"Type",      val:currentWorkout.type },
                ].map((s,i)=>(
                  <div key={i} style={{ background:"#0D0D18", border:"1px solid #1A1A2E", borderRadius:10, padding:"10px 14px", flex:1 }}>
                    <div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:1 }}>{s.label}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:s.col||"#fff", marginTop:4 }}>{s.val}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize:11, color:"#555", textTransform:"uppercase", letterSpacing:"2px", marginBottom:12 }}>Exercises</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {currentWorkout.exercises.map((ex,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 16px", background:"#0D0D18", borderRadius:10, border:"1px solid #1A1A2E" }}>
                    <div style={{ width:26, height:26, borderRadius:7, background:`${g.color}22`, color:g.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                    <div style={{ fontSize:13, color:"#ddd" }}>{ex}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MEALS ── */}
        {activeTab==="meals" && (
          <div className="fade" style={{ marginTop:22 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:16 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {meals.map((meal,i)=>(
                  <div key={i}>
                    {/* Meal Row */}
                    <div className="card" style={{ background:"#11111E", border:"1px solid #1A1A2E", borderRadius:16, padding:"18px 22px" }}>
                      <div style={{ display:"grid", gridTemplateColumns:"110px 1fr auto", gap:12, alignItems:"start" }}>
                        <div>
                          <div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:1 }}>{meal.meal}</div>
                          <div style={{ fontSize:12, color:g.color, fontWeight:600, marginTop:2 }}>{meal.time}</div>
                        </div>
                        <div>
                          <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:8 }}>{meal.name}</div>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                            {meal.items.map((it,j)=>(
                              <span key={j} style={{ padding:"3px 10px", background:"#0D0D18", border:"1px solid #1A1A2E", borderRadius:20, fontSize:11, color:"#aaa" }}>{it}</span>
                            ))}
                          </div>
                        </div>
                        <div style={{ textAlign:"right", minWidth:70 }}>
                          <div style={{ fontSize:18, fontWeight:700, color:g.color }}>{meal.calories}</div>
                          <div style={{ fontSize:10, color:"#555" }}>kcal</div>
                          <div style={{ fontSize:14, fontWeight:600, color:"#fff", marginTop:4 }}>{meal.protein}g</div>
                          <div style={{ fontSize:10, color:"#555" }}>protein</div>
                        </div>
                      </div>

                      {/* Recipe Toggle */}
                      <button onClick={()=>setRecipeOpen(recipeOpen===i?null:i)} className="btn" style={{ marginTop:12, padding:"7px 16px", borderRadius:8, border:`1px solid ${recipeOpen===i?g.color:"#1A1A2E"}`, background:recipeOpen===i?`${g.color}22`:"transparent", color:recipeOpen===i?g.color:"#666", fontSize:12, fontWeight:600 }}>
                        {recipeOpen===i?"▲ Hide Recipe":"📖 View Recipe"}
                      </button>

                      {/* Recipe Panel */}
                      {recipeOpen===i && meal.recipe && (
                        <div className="recipe-panel" style={{ marginTop:14, background:"#0D0D18", borderRadius:12, padding:"18px 20px", border:`1px solid ${g.color}33` }}>
                          <div style={{ display:"flex", gap:20, marginBottom:14 }}>
                            {[{l:"Prep",v:meal.recipe.prepTime},{l:"Cook",v:meal.recipe.cookTime},{l:"Serves",v:meal.recipe.serves}].map((s,j)=>(
                              <div key={j} style={{ background:"#11111E", borderRadius:8, padding:"8px 14px", textAlign:"center" }}>
                                <div style={{ fontSize:13, fontWeight:700, color:g.color }}>{s.v}</div>
                                <div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:1 }}>{s.l}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ fontSize:11, color:"#555", textTransform:"uppercase", letterSpacing:"2px", marginBottom:10 }}>Instructions</div>
                          {meal.recipe.instructions.map((step,j)=>(
                            <div key={j} style={{ display:"flex", gap:12, marginBottom:10 }}>
                              <div style={{ width:22, height:22, borderRadius:6, background:`${g.color}22`, color:g.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0, marginTop:1 }}>{j+1}</div>
                              <div style={{ fontSize:13, color:"#ccc", lineHeight:1.5 }}>{step}</div>
                            </div>
                          ))}
                          {meal.recipe.tip && (
                            <div style={{ marginTop:14, padding:"10px 14px", background:`${g.color}14`, borderRadius:8, borderLeft:`3px solid ${g.color}`, fontSize:12, color:"#bbb" }}>
                              💡 <strong style={{ color:g.color }}>Chef's Tip:</strong> {meal.recipe.tip}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Nutrition Panel */}
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ background:`linear-gradient(135deg,${g.color}16,${g.color}06)`, border:`1px solid ${g.color}44`, borderRadius:16, padding:22 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:g.color, textTransform:"uppercase", letterSpacing:"2px", marginBottom:16 }}>Week {currentWeek} Nutrition</div>
                  {[
                    { label:"Total Calories", val:totalCal,  target:g.calories, unit:"kcal" },
                    { label:"Total Protein",  val:totalProt, target:g.protein,  unit:"g" },
                  ].map((n,i)=>{
                    const pct=Math.min(100,Math.round(n.val/n.target*100));
                    return (
                      <div key={i} style={{ marginBottom:18 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                          <span style={{ fontSize:12, color:"#aaa" }}>{n.label}</span>
                          <span style={{ fontSize:12, color:"#fff", fontWeight:700 }}>{n.val}{n.unit}</span>
                        </div>
                        <div style={{ height:7, background:"#1A1A2E", borderRadius:4 }}>
                          <div style={{ height:"100%", width:`${pct}%`, background:g.color, borderRadius:4, transition:"width .4s" }}/>
                        </div>
                        <div style={{ fontSize:10, color:"#555", marginTop:3, textAlign:"right" }}>Target: {n.target}{n.unit}</div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ background:"#11111E", border:"1px solid #1A1A2E", borderRadius:16, padding:20 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"2px", marginBottom:14 }}>Weekly Tips</div>
                  {["🥤 Drink 3–4L water daily","🕐 Eat every 3–4 hours","🌙 No heavy carbs after 8pm","💊 Daily multivitamin","🥦 Half plate = vegetables","😴 8hrs sleep for recovery"].map((tip,i)=>(
                    <div key={i} style={{ fontSize:12, color:"#aaa", padding:"8px 0", borderBottom:i<5?"1px solid #1A1A2E":"none" }}>{tip}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
