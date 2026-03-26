import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ============================================================
// STORY DATA — THE TROY SAGA
// ============================================================

const ODYSSEUS_STORY = {
  start: {
    id: "start",
    saga: "THE TROY SAGA — ACT I",
    title: "THE WOODEN HORSE",
    text: "Ten years. Ten years of blood in the sand before the walls of Troy. Your men are exhausted. Agamemnon grows impatient. The gods grow restless. And still — the city stands.\n\nThen, in the dark of night, Athena comes to you in a dream. Her grey eyes flash with something you've seen before: strategy. She shows you a horse. A massive wooden horse. A gift. A lie.\n\nYou wake before dawn. Your plan is already forming.",
    choices: [
      { text: "Propose the Trojan Horse to Agamemnon", next: "horse_proposed" },
      { text: "Doubt the vision. Launch a final assault instead.", next: "final_assault" },
    ],
  },
  horse_proposed: {
    id: "horse_proposed",
    saga: "THE TROY SAGA — ACT I",
    title: "THE GREATEST LIE EVER TOLD",
    text: "The men think you've lost your mind. Even Agamemnon raises an eyebrow. A horse? After ten years of siege, your plan is a horse?\n\nBut you speak with the certainty of a man who has seen the face of Athena. And one by one, the commanders fall into line.\n\nThe horse takes shape over three days. Hollow. Beautiful. Catastrophic.\n\nNow comes the hardest part — someone has to climb inside.",
    choices: [
      { text: "Lead the raid yourself. You go in the horse.", next: "inside_horse" },
      { text: "Send your best men. You stay with the fleet.", next: "outside_fleet" },
    ],
  },
  final_assault: {
    id: "final_assault",
    saga: "THE TROY SAGA — ACT I",
    title: "GLORY OR DUST",
    isEnding: true,
    endingType: "defeat",
    endingTitle: "THE STUBBORN KING",
    text: "The trumpets sound at dawn. Odysseus of Ithaca, the great tactician, leads the final charge straight at the gates of Troy.\n\nThe arrows come first. Then the boiling oil.\n\nYour men fall. You push forward. The gates do not yield.\n\nAs you pull a spear from your shoulder, bleeding in the sand, you see it — the grey eyes of Athena, watching from the walls. Disappointed.",
    endingText: "Pride is a prison. The walls of Troy stand. Your men whisper that you've lost Athena's favor. The war drags on. Some journeys end before they begin.",
  },
  inside_horse: {
    id: "inside_horse",
    saga: "THE TROY SAGA — ACT II",
    title: "INSIDE THE BELLY",
    text: "Twelve men. Crammed in darkness, breathing in splinters and sweat. The horse is dragged through the gates of Troy. You can hear the Trojans celebrating outside — cheering, singing. They think the Greeks have fled.\n\nHours pass. Then, in the deep dark of midnight, you feel the city grow quiet.\n\nThen — a sound. One of your men, trembling with nerves, lets out a sharp cough. It echoes inside the wooden chamber.\n\nBelow, you hear Trojan footsteps stop.",
    choices: [
      { text: "Clamp your hand over his mouth. Hard. Silence him.", next: "horse_silenced" },
      { text: "Don't move. Let the gods decide.", next: "horse_discovered" },
    ],
  },
  outside_fleet: {
    id: "outside_fleet",
    saga: "THE TROY SAGA — ACT II",
    title: "WATCHING FROM THE DARK",
    text: "You watch from the black water as the horse disappears through Troy's gates. Your best men are inside. Your best plan. Your best gamble.\n\nThe fleet waits in silence. Hours bleed into each other. Then — torchlight. The gates of Troy swing open from the inside.\n\nYour men. They did it.",
    choices: [
      { text: "Row to shore immediately. Join the sack.", next: "sack_of_troy" },
      { text: "Wait. Something feels wrong.", next: "fleet_cautious" },
    ],
  },
  horse_silenced: {
    id: "horse_silenced",
    saga: "THE TROY SAGA — ACT II",
    title: "SILENCE IN THE DARK",
    text: "The footsteps pause. You don't breathe. Nobody breathes.\n\nThen — they move on. Troy sleeps again.\n\nAt midnight, when the last torch gutters out, you drop from the belly of the horse into the silent courtyard. One by one, your men follow.\n\nThe gates open from the inside. The Greeks pour in.\n\nTroy burns by dawn.",
    choices: [
      { text: "Head straight to the palace. This ends tonight.", next: "sack_of_troy" },
      { text: "Find old King Priam. A king deserves mercy.", next: "mercy_priam" },
    ],
  },
  horse_discovered: {
    id: "horse_discovered",
    saga: "THE TROY SAGA — ACT II",
    title: "THE HORSE BURNS",
    isEnding: true,
    endingType: "death",
    endingTitle: "DISCOVERED",
    text: "The footsteps stop. Then voices. Then shouting. The wood around you shudders as Trojan spears slam into the horse's sides.\n\nThey know.\n\nThe smell of smoke reaches you first. Then the heat.",
    endingText: "The horse burns with you inside it. Twelve men. Gone. The war continues for three more years. Troy never falls. Your name fades from the songs.\n\nSome bets cannot be left to the gods.",
  },
  fleet_cautious: {
    id: "fleet_cautious",
    saga: "THE TROY SAGA — ACT II",
    title: "THE COST OF WAITING",
    text: "You wait. And in your waiting, you see what your men do when there is no general to stop them.\n\nThe temples burn first. Agamemnon's men drag a priestess from the temple of Athena herself.\n\nYou arrive to a city already broken. And to a goddess already furious.",
    choices: [
      { text: "Step in. Stop the desecration. Even now.", next: "speak_against_sack" },
      { text: "The city has fallen. Nothing can be undone.", next: "look_away" },
    ],
  },
  sack_of_troy: {
    id: "sack_of_troy",
    saga: "THE TROY SAGA — ACT III",
    title: "THE CITY FALLS",
    text: "Troy burns.\n\nTen years of war reduced to one night of fire. The city that launched a thousand ships is falling. Your men move through the streets like shadows.\n\nThen you see it — Agamemnon's soldiers dragging a priestess from the Temple of Athena. They are laughing. The goddess's statue watches with stone eyes.\n\nSomething cold moves through you.",
    choices: [
      { text: "Intervene. This is a temple. Athena is watching.", next: "speak_against_sack" },
      { text: "Look away. This is war. This is what war is.", next: "look_away" },
      { text: "Get to the ships. Your job here is done.", next: "flee_to_ships" },
    ],
  },
  mercy_priam: {
    id: "mercy_priam",
    saga: "THE TROY SAGA — ACT III",
    title: "THE OLD KING",
    text: "You find Priam at the altar of Zeus. Old. Weaponless. More ghost than king.\n\nHe doesn't beg. He just looks at you with eyes that have seen fifty years of war.\n\n\"Odysseus,\" he says. He knows your name.\n\nBehind you, you hear Agamemnon's men approaching.",
    choices: [
      { text: "Shield him from your own men. Let him live.", next: "speak_against_sack" },
      { text: "Step aside. This is not your call to make.", next: "look_away" },
    ],
  },
  speak_against_sack: {
    id: "speak_against_sack",
    saga: "THE TROY SAGA — ACT III",
    title: "THE VOICE IN THE ASHES",
    text: "You step forward. You speak. The words come loud enough that even Agamemnon's men pause.\n\nThey don't listen — not fully. The damage is done. But somewhere above the smoke, in the cold grey sky, something watches.\n\nAthena.\n\nShe sees you. And for the first time in ten years, you feel like you might actually make it home.",
    choices: [
      { text: "Board your ship. Set sail for Ithaca.", next: "ending_blessed" },
    ],
  },
  look_away: {
    id: "look_away",
    saga: "THE TROY SAGA — ACT III",
    title: "THE EYES OF STONE",
    text: "You look away.\n\nYou tell yourself it's pragmatism. Strategy. You can't stop the tide of ten years of war in one moment.\n\nBut the statue of Athena in the burning temple — her stone eyes follow you as you walk away.\n\nSome things, once seen and ignored, cannot be forgotten. Not by men. Not by gods.",
    choices: [
      { text: "Board your ship. Set sail for Ithaca.", next: "ending_cursed" },
    ],
  },
  flee_to_ships: {
    id: "flee_to_ships",
    saga: "THE TROY SAGA — ACT III",
    title: "THE FIRST ONE OUT",
    text: "You make for the ships before the temples start to burn. Smart. Efficient.\n\nBut the sea is loud tonight. The waves slap the hull with a strange, deliberate rhythm. Your helmsman looks at you and says nothing.\n\nOut on the dark water, you could swear you see a figure beneath the waves. Watching.",
    choices: [
      { text: "Board your ship. Set sail for Ithaca.", next: "ending_unknown" },
    ],
  },
  ending_blessed: {
    id: "ending_blessed",
    isEnding: true,
    endingType: "triumph",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "FAVORED BY GREY EYES",
    text: "",
    endingText: "The wind fills your sails from the moment you leave Troy's coast. It shouldn't be this easy — ten years of enemies don't just let you go. But the sea is calm, the stars are clear, and somewhere in the rigging you keep hearing a voice that isn't quite the wind.\n\nYou are not home yet. The ocean is long and the gods are complex.\n\nBut you left Troy with your honor.\n\nThe journey home has begun.",
  },
  ending_cursed: {
    id: "ending_cursed",
    isEnding: true,
    endingType: "cursed",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "POSEIDON STIRS",
    text: "",
    endingText: "The fleet barely clears the coast of Troy when the storm hits. Waves like walls. Thunder that speaks in a voice older than language.\n\nYou hold the tiller and tell yourself it's just weather.\n\nBut your helmsman is weeping. And you know, somewhere deep in your chest, that this is not just weather.\n\nYou looked away when the gods were watching. And now the gods are watching still.\n\nThe journey home will be long. Much longer than you planned.",
  },
  ending_unknown: {
    id: "ending_unknown",
    isEnding: true,
    endingType: "unknown",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "THE WINE-DARK SEA",
    text: "",
    endingText: "The sea stretches before you — vast and unknowable. You left Troy before the worst of it. You're not guilty of the sacrilege. But you're not innocent either.\n\nThe gods don't grade on a curve.\n\nSomewhere ahead: the Cyclops. The Sirens. Circe's island. The Underworld itself.\n\nYou are Odysseus of Ithaca. And the ocean has plans for you.\n\nThe journey home will be... interesting.",
  },
};

const CREW_STORY = {
  start: {
    id: "start",
    saga: "THE TROY SAGA — ACT I",
    title: "ANOTHER DAY, ANOTHER WALL",
    text: "You are one of thousands. A soldier of Ithaca, following the cleverest king in Greece to a war you didn't start.\n\nTen years. You've survived ten years. That already makes you exceptional.\n\nThen, one morning, word spreads through camp: the captain has a plan. Something about a horse.",
    choices: [
      { text: "Volunteer to go inside the horse. Prove your worth.", next: "crew_volunteer" },
      { text: "Keep your head down. Let someone else be the hero.", next: "crew_stays_back" },
    ],
  },
  crew_volunteer: {
    id: "crew_volunteer",
    saga: "THE TROY SAGA — ACT II",
    title: "THE BELLY OF THE BEAST",
    text: "Odysseus picks you himself. That's either an honor or a death sentence.\n\nTwelve of you, packed into the horse's belly. The wood smells of fresh pine and panic. You've fought in open fields for ten years. This — cramped darkness, depending on deception — this is different.\n\nThe horse is dragged through the gates. Trojans cheer. They think they've won.\n\nHours later, in the deep silence of midnight, the soldier beside you — Elpenor, good man, terrible nerves — starts to shake. Then cough.",
    choices: [
      { text: "Clamp your hand over his mouth. Hard. Silence him.", next: "crew_silence" },
      { text: "Grab his hand instead. Steady him. Risk it.", next: "crew_comfort" },
    ],
  },
  crew_stays_back: {
    id: "crew_stays_back",
    saga: "THE TROY SAGA — ACT II",
    title: "FROM THE SHORE",
    text: "You watch the horse roll through the gates from the deck of a ship. Smart call. Probably.\n\nThe night is long. Then — torchlight. The gates swing open. The men pour in.\n\nYou're rowing to shore before anyone gives the order. By the time you reach the streets of Troy, it's already chaos.\n\nA Trojan soldier — young, your age — stumbles into an alley. He drops his spear. He's not fighting anymore.",
    choices: [
      { text: "End it. He's the enemy.", next: "crew_kills" },
      { text: "Let him go. The war is already over.", next: "crew_spares" },
    ],
  },
  crew_silence: {
    id: "crew_silence",
    saga: "THE TROY SAGA — ACT II",
    title: "HELD BREATH",
    text: "Elpenor's eyes go wide. He stares at you. You stare back. Don't. You will him. Please don't.\n\nThe footsteps below pause.\n\nThen pass.\n\nYou don't release your grip until you hear them fade. When you finally let go, Elpenor looks at you with something between gratitude and shame.\n\nAt midnight, you drop from the horse. Troy is yours.",
    choices: [
      { text: "Fight your way through to the palace gates.", next: "crew_sack_choice" },
      { text: "Find Elpenor first. Make sure he's holding together.", next: "crew_elpenor" },
    ],
  },
  crew_comfort: {
    id: "crew_comfort",
    isEnding: true,
    endingType: "death",
    endingTitle: "THE HORSE BURNS",
    saga: "THE TROY SAGA — ACT II",
    title: "THE COST OF KINDNESS",
    text: "You squeeze his hand. He steadies — barely.\n\nThe cough comes anyway. Small. Almost nothing.\n\nBut Troy is very quiet at midnight.\n\nBelow, the footsteps stop. Voices. Getting louder.\n\nOdysseus's eyes find yours in the dark. He doesn't look angry. Just... tired.",
    endingText: "The horse burns with all of you inside it. Kindness, in the wrong moment, is still a mistake.\n\nElpenor survives, somehow. He never speaks of the horse again.\n\nBut when he finally gets home, he plants an olive tree. He names it after you.",
  },
  crew_kills: {
    id: "crew_kills",
    saga: "THE TROY SAGA — ACT III",
    title: "THE COST OF WAR",
    text: "You do what soldiers do. The Trojan falls. You move on.\n\nAnd yet. And yet.\n\nHis face stays with you through the burning streets, through the ships, through the sea. You are not the first soldier to carry a face like that. You will not be the last.",
    choices: [
      { text: "Board the ship. Set sail. Leave it behind.", next: "crew_ending_haunted" },
    ],
  },
  crew_spares: {
    id: "crew_spares",
    saga: "THE TROY SAGA — ACT III",
    title: "A CHOICE NOT IN THE HISTORIES",
    text: "You let him go. He runs. He doesn't look back.\n\nSomething shifts in the smoke above you. An invisible presence — watchful. Warm.\n\nYou don't know why you did it. Maybe ten years of war is enough. Maybe he reminded you of someone.\n\nEither way — the war is over. And you're still standing.",
    choices: [
      { text: "Board the ship. Set sail. Go home.", next: "crew_ending_light" },
    ],
  },
  crew_sack_choice: {
    id: "crew_sack_choice",
    saga: "THE TROY SAGA — ACT III",
    title: "THE STREETS OF TROY",
    text: "Troy is burning. You're a soldier in a burning city. In the chaos, you see Agamemnon's men dragging a priestess from the temple of Athena.\n\nOdysseus is not here. No one important is watching.\n\nOr so you think.",
    choices: [
      { text: "Step in. Pull them off her.", next: "crew_saves_priestess" },
      { text: "Keep moving. Stay alive.", next: "crew_ending_haunted" },
    ],
  },
  crew_elpenor: {
    id: "crew_elpenor",
    saga: "THE TROY SAGA — ACT III",
    title: "LOOK AFTER EACH OTHER",
    text: "Elpenor is standing outside the horse, disoriented, overwhelmed. The city is burning. Men are streaming past.\n\nYou grab his arm. He looks at you — that same look from inside the horse. \"I owe you,\" he says.\n\n\"Buy me a drink in Ithaca,\" you tell him.\n\nYou fight through the burning city together.",
    choices: [
      { text: "Get to the ships. Get home.", next: "crew_ending_together" },
    ],
  },
  crew_saves_priestess: {
    id: "crew_saves_priestess",
    saga: "THE TROY SAGA — ACT III",
    title: "GREY EYES IN THE SMOKE",
    text: "They back off when they see your face. Something in your eyes — or maybe the goddess herself put steel in your voice.\n\nThe priestess looks at you. She says one word in Trojan.\n\nYou don't speak Trojan. But you know what gratitude sounds like.",
    choices: [
      { text: "Get to the ships. Set sail.", next: "crew_ending_light" },
    ],
  },
  crew_ending_light: {
    id: "crew_ending_light",
    isEnding: true,
    endingType: "triumph",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "CLEAN HANDS",
    endingText: "The sea is calm when you leave Troy. Calmer than it has any right to be after ten years of war.\n\nYou're a soldier. You didn't start this war and you didn't end it. But you made choices inside it — small ones, human ones — and they add up.\n\nOdysseus sits at the bow, staring at the horizon. You don't know what he sees.\n\nYou're going home. With clean hands.\n\nThat's enough. That's everything.",
  },
  crew_ending_haunted: {
    id: "crew_ending_haunted",
    isEnding: true,
    endingType: "cursed",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "WHAT SOLDIERS CARRY",
    endingText: "The ship leaves Troy on a grey morning. You stand at the stern, watching the smoke rise until the city disappears below the horizon.\n\nYou did what soldiers do. You survived. You followed orders. You looked away when looking away was the smart move.\n\nThe sea ahead is long and strange. Odysseus warns there will be monsters, sorcerers, gods.\n\nBut you already know that the hardest things to face are the ones you carry inside you.\n\nThe journey home has begun.",
  },
  crew_ending_together: {
    id: "crew_ending_together",
    isEnding: true,
    endingType: "unknown",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "BROTHERS IN THE DARK",
    endingText: "You find your ship with Elpenor at your side. He's talking too much — he always talks too much when he's scared — but his voice is familiar. Steady.\n\nOdysseus counts heads as you board. He sees you. He nods once.\n\nFrom Odysseus of Ithaca, that's practically a speech.\n\nThe sea is dark and the journey is long. You have no idea what's coming.\n\nBut you have your crew. And on the wine-dark sea, that's the only armor that matters.",
  },
};

const GOD_STORY = {
  start: {
    id: "start",
    saga: "THE TROY SAGA — FROM OLYMPUS",
    title: "CHOOSE YOUR DIVINITY",
    text: "From high above, the gods watch Troy burn.\n\nYou are not human. You do not bleed. You do not fear the dark waters or the wooden horse or the spears of ten thousand soldiers.\n\nYou are something older. Something permanent.\n\nBut even gods have favorites. Even gods have chosen sides.",
    choices: [
      { text: "I am Athena — goddess of wisdom and war", next: "god_athena_start" },
      { text: "I am Poseidon — god of the sea and earth-shaker", next: "god_poseidon_start" },
    ],
  },
  god_athena_start: {
    id: "god_athena_start",
    saga: "THE TROY SAGA — ATHENA'S GAMBIT",
    title: "THE GREY-EYED GODDESS",
    text: "You are Athena. Daughter of Zeus, born in full armor, goddess of the calculated mind.\n\nFor ten years you have watched Odysseus — the cleverest of the Greeks, your favorite mortal — batter himself against Troy's walls.\n\nTonight, you have an idea.\n\nA horse.",
    choices: [
      { text: "Visit Odysseus in a dream. Give him the plan.", next: "athena_gives_plan" },
      { text: "Let him figure it out. He's clever enough.", next: "athena_waits" },
    ],
  },
  god_poseidon_start: {
    id: "god_poseidon_start",
    saga: "THE TROY SAGA — POSEIDON'S WRATH",
    title: "THE EARTH-SHAKER",
    text: "You are Poseidon. Brother of Zeus, lord of the deep places, master of the ocean that lies between every man and his home.\n\nTroy was your city once. You helped build those walls. And now the Greeks tear them down with a trick. A wooden trick.\n\nYou are not angry.\n\nYou are patient. And patience, in a god, is more dangerous than rage.",
    choices: [
      { text: "Send a storm to destroy the Greek fleet. Now.", next: "poseidon_storm_now" },
      { text: "Wait. Let them win their little war. Then act.", next: "poseidon_waits" },
    ],
  },
  athena_gives_plan: {
    id: "athena_gives_plan",
    saga: "THE TROY SAGA — ATHENA'S GAMBIT",
    title: "THE DREAM",
    text: "You step into his dream like stepping into shallow water. Odysseus stirs — he always half-knows when you visit, that rare quality that makes him worth watching.\n\nYou show him the horse.\n\nHe wakes before dawn with his jaw set and his eyes bright. You watch him walk to Agamemnon's tent. You watch the plan take shape.\n\nTroy will fall. But there is still the question of afterward.",
    choices: [
      { text: "Protect the temples. Keep the soldiers from desecrating sacred ground.", next: "athena_protects" },
      { text: "Troy has fallen. Your work here is done.", next: "athena_withdraws" },
    ],
  },
  athena_waits: {
    id: "athena_waits",
    saga: "THE TROY SAGA — ATHENA'S GAMBIT",
    title: "FAITH IN MORTALS",
    text: "You wait.\n\nIt takes Odysseus three more days — longer than it would have if you'd intervened. There are wrong turns, false starts, one terrible idea involving a tunnel.\n\nBut then: the horse. His own design. His own genius.\n\nYou didn't give this to him. He found it himself.\n\nSomething like pride moves through you, which is unusual for a goddess.",
    choices: [
      { text: "Bless the plan now. Make sure it works.", next: "athena_protects" },
      { text: "Stay back. See if a mortal's plan holds without divine help.", next: "athena_withdraws" },
    ],
  },
  poseidon_storm_now: {
    id: "poseidon_storm_now",
    saga: "THE TROY SAGA — POSEIDON'S WRATH",
    title: "TOO SOON",
    text: "You raise the sea.\n\nThe waves come like walls, dark and cold, and the Greek ships scatter. Agamemnon's fleet is cut in half before they reach Troy.\n\nBut Zeus sees what you've done. And Zeus is... displeased.\n\n\"Brother,\" he says, in that voice like slow thunder. \"The Fates have already decided Troy falls. You cannot stop it.\"\n\nYou lower the storm. You lower your eyes.\n\nFor now.",
    choices: [
      { text: "Fine. Troy falls. But the Greeks will not reach home easily.", next: "poseidon_plans" },
    ],
  },
  poseidon_waits: {
    id: "poseidon_waits",
    saga: "THE TROY SAGA — POSEIDON'S WRATH",
    title: "THE LONG GAME",
    text: "Troy falls in a single night.\n\nYou watch from the deep water. The wooden horse. The fire. Agamemnon's soldiers desecrating temples, dragging people from altars, laughing in the ruins of your walls.\n\nOne of them violates the temple of Athena herself.\n\nYou wait for your sister to act. She does not — yet.\n\nYou feel something shift. An opportunity.",
    choices: [
      { text: "Go to Athena. Suggest you both punish the Greeks together.", next: "poseidon_alliance" },
      { text: "Act alone. The sea answers to you, not the other gods.", next: "poseidon_plans" },
    ],
  },
  athena_protects: {
    id: "athena_protects",
    saga: "THE TROY SAGA — ATHENA'S GAMBIT",
    title: "WHAT GODS PROTECT",
    text: "You move through the burning city like cold smoke.\n\nWhere soldiers approach the sacred places, their feet slow. Their torches gutter. They feel that particular sensation mortals get when a god stands nearby — the hair rising, the sudden sense of being very, very small.\n\nMost of them find other places to be.\n\nBut not Ajax. He goes to the temple anyway.",
    choices: [
      { text: "Punish Ajax. Make an example of his arrogance.", next: "athena_punishes_ajax" },
      { text: "Focus on Odysseus. Guide him safely to his ships.", next: "athena_guides_odysseus" },
    ],
  },
  athena_withdraws: {
    id: "athena_withdraws",
    saga: "THE TROY SAGA — ATHENA'S GAMBIT",
    title: "WHAT GODS ALLOW",
    text: "You watch.\n\nYou watch Agamemnon's soldiers tear through the city. You watch the temples desecrated, the altars overturned. You watch Ajax drag a priestess from your own temple — from your own altar — and laugh.\n\nYou feel something cold and very old move through you.\n\nGratitude has an expiration date. Even yours.",
    choices: [
      { text: "Withdraw your favor from the Greeks. Let the sea take them.", next: "athena_turns" },
    ],
  },
  poseidon_plans: {
    id: "poseidon_plans",
    saga: "THE TROY SAGA — POSEIDON'S WRATH",
    title: "THE SEA HAS PATIENCE",
    text: "Troy is ash. The Greeks are celebrating. Loading their ships with gold and the bones of a city they spent ten years breaking.\n\nYou wait until the last ship leaves the harbor.\n\nThen you begin.",
    choices: [
      { text: "Target Odysseus first. He is Athena's favorite — that alone is enough.", next: "poseidon_targets_odysseus" },
      { text: "Target Agamemnon's fleet. The greatest arrogance deserves the greatest fall.", next: "poseidon_targets_agamemnon" },
    ],
  },
  poseidon_alliance: {
    id: "poseidon_alliance",
    saga: "THE TROY SAGA — POSEIDON'S WRATH",
    title: "UNLIKELY ALLIES",
    text: "Athena is already on Olympus when you arrive. She sits with her owl and her armor and the expression of someone who has already considered fourteen possible outcomes.\n\n\"The sacrilege of Ajax,\" you say.\n\nShe looks at you. Her grey eyes give nothing away. But you know that look. That is the look of a goddess who is also angry.\n\n\"What do you propose, brother?\"",
    choices: [
      { text: "Together we scatter the Greek fleet on the rocks.", next: "poseidon_ending_storm" },
      { text: "Let them sail. And let Odysseus carry our judgment home with him.", next: "poseidon_targets_odysseus" },
    ],
  },
  athena_punishes_ajax: {
    id: "athena_punishes_ajax",
    isEnding: true,
    endingType: "triumph",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "THE GODDESS'S JUSTICE",
    endingText: "Ajax the Lesser — who thought himself untouchable — learns what it means to offend a goddess in her own house.\n\nYou guide his fleet to the rocks. One captain. One lesson.\n\nThe other Greeks watch his ship go down and grow very quiet.\n\nOdysseus, at the stern of his ship, looks up at the sky. He cannot see you. But he raises one hand, just slightly, in something like acknowledgment.\n\nThe grey-eyed goddess sails with him.\n\nFor now.",
  },
  athena_guides_odysseus: {
    id: "athena_guides_odysseus",
    isEnding: true,
    endingType: "triumph",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "THE FAVORITE",
    endingText: "You find Odysseus at the docks, loading his ship, head down against the smoke.\n\nYou cannot appear to him directly — not yet — so you become the wind. You fill his sails. You guide his hand on the tiller.\n\nHe sails away from Troy before the worst of it. Before the sacrilege that will curse the others.\n\nHe will face trials ahead. Many. But he will face them with the help of a goddess who has never entirely stopped watching.\n\nThat has to count for something.",
  },
  athena_turns: {
    id: "athena_turns",
    isEnding: true,
    endingType: "cursed",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "GREY EYES, COLD NOW",
    endingText: "You go to Poseidon. It is a short conversation.\n\nHe smiles — which is rare for him. \"I'll handle the sea,\" he says. \"You handle the homeward winds.\"\n\nYou handle the homeward winds. By removing them entirely.\n\nThe Greek fleet sits in dead water as Troy's smoke rises behind them. Agamemnon looks at the sky with the expression of a man beginning to understand.\n\nOdysseus is the only one you spare. Barely. You still need him for something.\n\nBut the others? The others are going to find the sea a very long road.",
  },
  poseidon_targets_odysseus: {
    id: "poseidon_targets_odysseus",
    isEnding: true,
    endingType: "cursed",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "THE GOD IN THE DEEP",
    endingText: "You wait until his fleet is three days out from Troy. Far enough that help won't come. Close enough that he can still see the smoke.\n\nThen you wake the deep currents. The cold places where the ocean floor drops away into darkness.\n\nOdysseus's ships are good ships. He is a good sailor.\n\nBut the sea is very old. And you are very patient.\n\nHe won't be home for twenty years.\n\nYou can wait that long.",
  },
  poseidon_targets_agamemnon: {
    id: "poseidon_targets_agamemnon",
    isEnding: true,
    endingType: "triumph",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "THE KING OF KINGS FALLS",
    endingText: "You send the storm into Agamemnon's fleet like a fist.\n\nOne hundred and twenty ships. The greatest armada the world has ever seen.\n\nThe rocks off Cape Caphereus remember this night for a thousand years.\n\nOdysseus's ships — smaller, faster, a little south of the main fleet — survive. He was never the target.\n\nHe looks back at the storm eating Agamemnon's ships and his face is unreadable. Smart man. He knows better than to look relieved.\n\nThe sea has spoken. And the sea is satisfied.",
  },
  poseidon_ending_storm: {
    id: "poseidon_ending_storm",
    isEnding: true,
    endingType: "triumph",
    saga: "THE TROY SAGA — EPILOGUE",
    endingTitle: "DIVINE RETRIBUTION",
    endingText: "Together, you and Athena raise a storm that historians will call a natural disaster.\n\nIt is not a natural disaster.\n\nThe Greek fleet scatters across the Aegean like leaves. Agamemnon limps home to a wife who has been very busy in his absence. Ajax is given the rocks as a gift.\n\nOdysseus escapes — Athena makes sure of that. Her fingers are in every favorable wind.\n\nBut his journey home will be long. You will make sure of that.\n\nA goddess and a sea-god, in agreement. The Greeks should have been more careful about whose temples they burned.",
  },
};

const STORIES = {
  odysseus: ODYSSEUS_STORY,
  crew: CREW_STORY,
  god: GOD_STORY,
};

// ============================================================
// ENDING CONFIG
// ============================================================

const ENDING_CONFIG = {
  triumph: { color: "#c9a84c", label: "TRIUMPH", border: "rgba(201,168,76,0.4)", bg: "rgba(201,168,76,0.06)" },
  death: { color: "#ff0033", label: "DEATH", border: "rgba(255,0,51,0.4)", bg: "rgba(255,0,51,0.06)" },
  defeat: { color: "#ff0033", label: "DEFEAT", border: "rgba(255,0,51,0.4)", bg: "rgba(255,0,51,0.06)" },
  cursed: { color: "#9966cc", label: "CURSED", border: "rgba(153,102,204,0.4)", bg: "rgba(153,102,204,0.06)" },
  unknown: { color: "#4a90d9", label: "UNKNOWN", border: "rgba(74,144,217,0.4)", bg: "rgba(74,144,217,0.06)" },
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function OdysseyMode() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro"); // intro | select | story | ending
  const [character, setCharacter] = useState(null);
  const [crewName, setCrewName] = useState("");
  const [currentSceneId, setCurrentSceneId] = useState("start");
  const [history, setHistory] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);

  const currentStory = character ? STORIES[character] : null;
  const currentScene = currentStory ? currentStory[currentSceneId] : null;

  const displayName =
    character === "odysseus" ? "Odysseus" :
    character === "crew" ? (crewName.trim() || "Soldier") :
    character === "god" ? "The God" : "";

  const transitionTo = (newPhase, callback) => {
    setFadeIn(false);
    setTimeout(() => {
      if (callback) callback();
      setFadeIn(true);
    }, 300);
    setTimeout(() => setPhase(newPhase), 150);
  };

  const handleChoice = (nextId) => {
    const nextScene = currentStory[nextId];
    setFadeIn(false);
    setTimeout(() => {
      setHistory((prev) => [...prev, currentSceneId]);
      setCurrentSceneId(nextId);
      if (nextScene?.isEnding) setPhase("ending");
      setFadeIn(true);
    }, 300);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    setFadeIn(false);
    setTimeout(() => {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentSceneId(prev);
      setPhase("story");
      setFadeIn(true);
    }, 300);
  };

  const handleRestart = () => {
    transitionTo("select", () => {
      setCharacter(null);
      setCrewName("");
      setCurrentSceneId("start");
      setHistory([]);
    });
  };

  const startAdventure = () => {
    if (!character) return;
    if (character === "crew" && !crewName.trim()) return;
    transitionTo("story", () => {
      setCurrentSceneId("start");
      setHistory([]);
    });
  };

  // ---- SHARED STYLES ----
  const pageStyle = {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  const globalCss = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes goldPulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .choice-btn {
      background: #111;
      border: 1px solid #222;
      color: #bbb;
      padding: 16px 24px;
      border-radius: 3px;
      cursor: pointer;
      font-family: 'Rajdhani', sans-serif;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 1px;
      text-align: left;
      transition: all 0.25s ease;
      width: 100%;
      line-height: 1.4;
      position: relative;
      overflow: hidden;
    }
    .choice-btn::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: #c9a84c;
      transform: scaleY(0);
      transition: transform 0.25s ease;
    }
    .choice-btn:hover {
      background: #161616;
      border-color: #c9a84c44;
      color: #fff;
      transform: translateX(4px);
    }
    .choice-btn:hover::before {
      transform: scaleY(1);
    }
    .char-card {
      background: #111;
      border: 1px solid #1a1a1a;
      border-radius: 4px;
      padding: 28px 24px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
      position: relative;
      overflow: hidden;
    }
    .char-card:hover, .char-card.selected {
      border-color: #c9a84c44;
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(201,168,76,0.12);
    }
    .char-card.selected {
      background: #141410;
    }
    .back-btn {
      background: transparent;
      border: 1px solid #222;
      color: #555;
      padding: 8px 18px;
      border-radius: 3px;
      cursor: pointer;
      font-family: 'Rajdhani', sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: all 0.2s ease;
    }
    .back-btn:hover {
      border-color: #c9a84c44;
      color: #c9a84c;
    }
    .begin-btn {
      background: linear-gradient(135deg, #c9a84c, #a07830);
      border: none;
      color: #0a0a0a;
      padding: 16px 48px;
      border-radius: 3px;
      cursor: pointer;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 20px;
      letter-spacing: 3px;
      transition: all 0.3s ease;
    }
    .begin-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(201,168,76,0.3);
    }
    .begin-btn:disabled {
      background: #222;
      color: #444;
      cursor: default;
      transform: none;
      box-shadow: none;
    }
    input.name-input {
      background: #111;
      border: 1px solid #333;
      color: #fff;
      padding: 12px 16px;
      border-radius: 3px;
      font-family: 'Rajdhani', sans-serif;
      font-size: 15px;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s ease;
      margin-top: 12px;
    }
    input.name-input:focus {
      border-color: #c9a84c88;
    }
    input.name-input::placeholder {
      color: #444;
    }
  `;

  const BG = (
    <>
      <style>{globalCss}</style>
      {/* Scanline */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "2px", background: "rgba(201,168,76,0.1)",
        animation: "scanline 4s linear infinite",
        zIndex: 10, pointerEvents: "none",
      }} />
      {/* Grid */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        pointerEvents: "none",
      }} />
      {/* Glow */}
      <div style={{
        position: "fixed", top: "-150px", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
    </>
  );

  const container = {
    maxWidth: "760px",
    margin: "0 auto",
    padding: "60px 24px",
    position: "relative",
    zIndex: 5,
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? "translateY(0)" : "translateY(16px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  };

  // ============================================================
  // INTRO
  // ============================================================
  if (phase === "intro") {
    return (
      <div style={pageStyle}>
        {BG}
        <div style={container}>
          <button className="back-btn" onClick={() => navigate("/")} style={{ marginBottom: "48px" }}>
            ← BACK TO ARCHIVE
          </button>

          <div style={{ textAlign: "center" }}>
            <div style={{
              display: "inline-block",
              padding: "6px 20px",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "2px",
              fontSize: "11px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "28px",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              animation: "goldPulse 3s ease-in-out infinite",
            }}>
              ⚔ NOW ENTERING ⚔
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px, 14vw, 130px)",
              lineHeight: 0.85,
              margin: "0 0 16px 0",
              letterSpacing: "4px",
              color: "#fff",
            }}>
              <span style={{ color: "#c9a84c" }}>[ </span>
              ODYSSEY MODE
              <span style={{ color: "#c9a84c" }}> ]</span>
            </h1>

            <p style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "13px",
              color: "#666",
              letterSpacing: "5px",
              textTransform: "uppercase",
              margin: "0 0 12px 0",
              fontWeight: 600,
            }}>
              THE TROY SAGA
            </p>

            <div style={{
              width: "80px", height: "1px",
              background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
              margin: "24px auto",
            }} />

            <p style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "16px",
              color: "#777",
              lineHeight: 1.8,
              maxWidth: "520px",
              margin: "0 auto 48px",
              fontWeight: 500,
            }}>
              Ten years of war. One city. Countless choices that will determine whether you ever see home again.
              <br /><br />
              Inspired by <em style={{ color: "#c9a84c" }}>EPIC: The Musical</em>.
              Every decision matters. Not all paths lead home.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" }}>
              {[
                { icon: "⚔️", label: "Full branching story" },
                { icon: "🏛", label: "3 perspectives" },
                { icon: "🌊", label: "Multiple endings" },
              ].map((f) => (
                <div key={f.label} style={{
                  padding: "8px 18px",
                  border: "1px solid #1a1a1a",
                  borderRadius: "2px",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  color: "#555",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}>
                  {f.icon} {f.label}
                </div>
              ))}
            </div>

            <button
              className="begin-btn"
              onClick={() => transitionTo("select")}
              style={{ marginTop: "32px" }}
            >
              BEGIN THE ODYSSEY
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // CHARACTER SELECT
  // ============================================================
  if (phase === "select") {
    const chars = [
      {
        id: "odysseus",
        icon: "👑",
        title: "ODYSSEUS",
        subtitle: "King of Ithaca",
        desc: "The cleverest man in Greece. You built the horse. The weight of every choice is yours.",
        color: "#c9a84c",
      },
      {
        id: "crew",
        icon: "⚔️",
        title: "CREW MEMBER",
        subtitle: "Soldier of Ithaca",
        desc: "You follow. You survive. Your choices are smaller — but they are yours.",
        color: "#888",
        hasInput: true,
      },
      {
        id: "god",
        icon: "⚡",
        title: "THE DIVINE",
        subtitle: "Athena or Poseidon",
        desc: "You watch from above. You are not bound by mortal rules. But even gods have agendas.",
        color: "#9966cc",
      },
    ];

    const canStart = character && (character !== "crew" || crewName.trim().length > 0);

    return (
      <div style={pageStyle}>
        {BG}
        <div style={container}>
          <button className="back-btn" onClick={() => transitionTo("intro")} style={{ marginBottom: "40px" }}>
            ← BACK
          </button>

          <div style={{ marginBottom: "40px" }}>
            <p style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              letterSpacing: "5px",
              color: "#c9a84c",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "8px",
            }}>
              ⚔ CHOOSE YOUR PATH
            </p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "52px",
              margin: 0,
              letterSpacing: "2px",
              color: "#fff",
            }}>
              WHO ARE YOU?
            </h2>
          </div>

          <div style={{ display: "grid", gap: "16px", marginBottom: "40px" }}>
            {chars.map((c) => (
              <div
                key={c.id}
                className={`char-card ${character === c.id ? "selected" : ""}`}
                onClick={() => setCharacter(c.id)}
              >
                {character === c.id && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    background: `radial-gradient(ellipse at top left, ${c.color}08 0%, transparent 60%)`,
                    pointerEvents: "none",
                    borderRadius: "4px",
                  }} />
                )}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                  <div style={{
                    fontSize: "32px",
                    filter: character === c.id ? "none" : "grayscale(0.5) opacity(0.6)",
                    transition: "filter 0.3s",
                    flexShrink: 0,
                  }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                      <h3 style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "24px",
                        margin: 0,
                        letterSpacing: "2px",
                        color: character === c.id ? c.color : "#fff",
                        transition: "color 0.3s",
                      }}>
                        {c.title}
                      </h3>
                      <span style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "2px",
                        color: "#555",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}>
                        {c.subtitle}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "14px",
                      color: "#777",
                      margin: 0,
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}>
                      {c.desc}
                    </p>
                    {c.hasInput && character === "crew" && (
                      <input
                        className="name-input"
                        type="text"
                        placeholder="Enter your name, soldier..."
                        value={crewName}
                        onChange={(e) => setCrewName(e.target.value)}
                        maxLength={20}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                    )}
                  </div>
                  {character === c.id && (
                    <div style={{
                      width: "20px",
                      height: "20px",
                      border: `2px solid ${c.color}`,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <div style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: c.color,
                      }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            {character === "crew" && !crewName.trim() && (
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "12px",
                color: "#555",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}>
                Enter your name to begin
              </p>
            )}
            <button
              className="begin-btn"
              onClick={startAdventure}
              disabled={!canStart}
            >
              {character === "crew" && crewName.trim()
                ? `BEGIN AS ${crewName.toUpperCase()}`
                : character === "odysseus"
                ? "BEGIN AS ODYSSEUS"
                : character === "god"
                ? "ASCEND TO OLYMPUS"
                : "CHOOSE YOUR PATH"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // STORY
  // ============================================================
  if (phase === "story" && currentScene) {
    return (
      <div style={pageStyle}>
        {BG}
        <div style={container}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
            <button className="back-btn" onClick={handleBack} disabled={history.length === 0}
              style={{ opacity: history.length === 0 ? 0.3 : 1, cursor: history.length === 0 ? "default" : "pointer" }}>
              ← BACK
            </button>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#444",
              textTransform: "uppercase",
              fontWeight: 600,
            }}>
              Playing as: <span style={{ color: "#c9a84c" }}>{displayName}</span>
            </div>
            <button className="back-btn" onClick={() => transitionTo("intro", () => {
              setCharacter(null); setCrewName(""); setCurrentSceneId("start"); setHistory([]);
            })}>
              RESTART
            </button>
          </div>

          {/* Saga label */}
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "11px",
            letterSpacing: "4px",
            color: "#c9a84c",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: "8px",
          }}>
            {currentScene.saga}
          </p>

          {/* Scene title */}
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 8vw, 72px)",
            lineHeight: 0.9,
            margin: "0 0 32px 0",
            letterSpacing: "2px",
            color: "#fff",
          }}>
            {currentScene.title}
          </h2>

          <div style={{
            width: "50px", height: "1px",
            background: "linear-gradient(90deg, #c9a84c, transparent)",
            marginBottom: "32px",
          }} />

          {/* Scene text */}
          <div style={{
            background: "#0d0d0d",
            border: "1px solid #1a1a1a",
            borderLeft: "3px solid rgba(201,168,76,0.3)",
            borderRadius: "3px",
            padding: "28px 28px",
            marginBottom: "36px",
          }}>
            {currentScene.text.split("\n\n").map((para, i) => (
              <p key={i} style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                color: "#aaa",
                lineHeight: 1.9,
                margin: i < currentScene.text.split("\n\n").length - 1 ? "0 0 16px 0" : 0,
                fontWeight: 500,
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Choices */}
          {currentScene.choices && (
            <div>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "11px",
                letterSpacing: "4px",
                color: "#444",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "14px",
              }}>
                ◈ WHAT DO YOU DO?
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {currentScene.choices.map((choice, i) => (
                  <button
                    key={i}
                    className="choice-btn"
                    onClick={() => handleChoice(choice.next)}
                  >
                    <span style={{ color: "#c9a84c", marginRight: "10px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px" }}>
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Progress dots */}
          {history.length > 0 && (
            <div style={{ display: "flex", gap: "6px", marginTop: "36px", justifyContent: "center" }}>
              {[...history, currentSceneId].map((_, i) => (
                <div key={i} style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: i === history.length ? "#c9a84c" : "#2a2a2a",
                }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // ENDING
  // ============================================================
  if (phase === "ending" && currentScene) {
    const ec = ENDING_CONFIG[currentScene.endingType] || ENDING_CONFIG.unknown;
    return (
      <div style={pageStyle}>
        {BG}
        <div style={container}>
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            {/* Ending type badge */}
            <div style={{
              display: "inline-block",
              padding: "6px 24px",
              border: `1px solid ${ec.border}`,
              background: ec.bg,
              borderRadius: "2px",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "14px",
              letterSpacing: "5px",
              color: ec.color,
              marginBottom: "32px",
            }}>
              ◆ {ec.label} ◆
            </div>

            {/* Saga label */}
            <p style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              letterSpacing: "4px",
              color: "#555",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "12px",
            }}>
              {currentScene.saga}
            </p>

            {/* Ending title */}
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(44px, 9vw, 80px)",
              lineHeight: 0.9,
              margin: "0 0 32px 0",
              letterSpacing: "3px",
              color: ec.color,
            }}>
              {currentScene.endingTitle}
            </h2>

            <div style={{
              width: "80px", height: "1px",
              background: `linear-gradient(90deg, transparent, ${ec.color}, transparent)`,
              margin: "0 auto 40px",
            }} />

            {/* Ending text */}
            <div style={{
              background: "#0d0d0d",
              border: `1px solid ${ec.border}`,
              borderRadius: "4px",
              padding: "36px 36px",
              maxWidth: "580px",
              margin: "0 auto 48px",
              textAlign: "left",
            }}>
              {currentScene.endingText.split("\n\n").map((para, i) => (
                <p key={i} style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "16px",
                  color: "#bbb",
                  lineHeight: 2,
                  margin: i < currentScene.endingText.split("\n\n").length - 1 ? "0 0 16px 0" : 0,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Played as */}
            <p style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "12px",
              color: "#444",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "32px",
              fontWeight: 600,
            }}>
              Played as: <span style={{ color: "#666" }}>{displayName}</span>
              {"  ·  "}
              Choices made: <span style={{ color: "#666" }}>{history.length}</span>
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="begin-btn" onClick={handleRestart}>
                PLAY AGAIN
              </button>
              <button className="back-btn" onClick={() => navigate("/")} style={{ padding: "14px 32px", fontSize: "14px" }}>
                ← BACK TO ARCHIVE
              </button>
            </div>

            {/* Saga count hint */}
            <p style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "12px",
              color: "#333",
              letterSpacing: "2px",
              marginTop: "40px",
              fontWeight: 600,
            }}>
              TROY SAGA COMPLETE — 8 SAGAS REMAIN
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
