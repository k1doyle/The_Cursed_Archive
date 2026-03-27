import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ============================================================
// TROY SAGA STORIES
// ============================================================

const TROY_ODYSSEUS = {
  start: { id:"start", saga:"THE TROY SAGA — ACT I", title:"THE WOODEN HORSE", text:"Ten years. Ten years of blood in the sand before the walls of Troy. Your men are exhausted. Agamemnon grows impatient. The gods grow restless. And still — the city stands.\n\nThen, in the dark of night, Athena comes to you in a dream. Her grey eyes flash with something you've seen before: strategy. She shows you a horse. A massive wooden horse. A gift. A lie.\n\nYou wake before dawn. Your plan is already forming.", choices:[{text:"Propose the Trojan Horse to Agamemnon",next:"horse_proposed"},{text:"Doubt the vision. Launch a final assault instead.",next:"final_assault"}]},
  horse_proposed: { id:"horse_proposed", saga:"THE TROY SAGA — ACT I", title:"THE GREATEST LIE EVER TOLD", text:"The men think you've lost your mind. Even Agamemnon raises an eyebrow. A horse? After ten years of siege, your plan is a horse?\n\nBut you speak with the certainty of a man who has seen the face of Athena. And one by one, the commanders fall into line.\n\nThe horse takes shape over three days. Hollow. Beautiful. Catastrophic.\n\nNow comes the hardest part — someone has to climb inside.", choices:[{text:"Lead the raid yourself. You go in the horse.",next:"inside_horse"},{text:"Send your best men. You stay with the fleet.",next:"outside_fleet"}]},
  final_assault: { id:"final_assault", saga:"THE TROY SAGA — ACT I", title:"GLORY OR DUST", isEnding:true, endingType:"defeat", endingTitle:"THE STUBBORN KING", text:"The trumpets sound at dawn. Odysseus of Ithaca, the great tactician, leads the final charge straight at the gates of Troy.\n\nThe arrows come first. Then the boiling oil.\n\nYour men fall. You push forward. The gates do not yield.\n\nAs you pull a spear from your shoulder, bleeding in the sand, you see it — the grey eyes of Athena, watching from the walls. Disappointed.", endingText:"Pride is a prison. The walls of Troy stand. Your men whisper that you've lost Athena's favor. The war drags on. Some journeys end before they begin."},
  inside_horse: { id:"inside_horse", saga:"THE TROY SAGA — ACT II", title:"INSIDE THE BELLY", text:"Twelve men. Crammed in darkness, breathing in splinters and sweat. The horse is dragged through the gates of Troy. You can hear the Trojans celebrating outside — cheering, singing. They think the Greeks have fled.\n\nHours pass. Then, in the deep dark of midnight, you feel the city grow quiet.\n\nThen — a sound. One of your men, trembling with nerves, lets out a sharp cough. It echoes inside the wooden chamber.\n\nBelow, you hear Trojan footsteps stop.", choices:[{text:"Clamp your hand over his mouth. Hard. Silence him.",next:"horse_silenced"},{text:"Don't move. Let the gods decide.",next:"horse_discovered"}]},
  outside_fleet: { id:"outside_fleet", saga:"THE TROY SAGA — ACT II", title:"WATCHING FROM THE DARK", text:"You watch from the black water as the horse disappears through Troy's gates. Your best men are inside. Your best plan. Your best gamble.\n\nThe fleet waits in silence. Hours bleed into each other. Then — torchlight. The gates of Troy swing open from the inside.\n\nYour men. They did it.", choices:[{text:"Row to shore immediately. Join the sack.",next:"sack_of_troy"},{text:"Wait. Something feels wrong.",next:"fleet_cautious"}]},
  horse_silenced: { id:"horse_silenced", saga:"THE TROY SAGA — ACT II", title:"SILENCE IN THE DARK", text:"The footsteps pause. You don't breathe. Nobody breathes.\n\nThen — they move on. Troy sleeps again.\n\nAt midnight, when the last torch gutters out, you drop from the belly of the horse into the silent courtyard. One by one, your men follow.\n\nThe gates open from the inside. The Greeks pour in.\n\nTroy burns by dawn.", choices:[{text:"Head straight to the palace. This ends tonight.",next:"sack_of_troy"},{text:"Find old King Priam. A king deserves mercy.",next:"mercy_priam"}]},
  horse_discovered: { id:"horse_discovered", saga:"THE TROY SAGA — ACT II", title:"THE HORSE BURNS", isEnding:true, endingType:"death", endingTitle:"DISCOVERED", text:"The footsteps stop. Then voices. Then shouting. The wood around you shudders as Trojan spears slam into the horse's sides.\n\nThey know.\n\nThe smell of smoke reaches you first. Then the heat.", endingText:"The horse burns with you inside it. Twelve men. Gone. The war continues for three more years. Troy never falls. Your name fades from the songs.\n\nSome bets cannot be left to the gods.", sagaCount:"1 of 9"},
  fleet_cautious: { id:"fleet_cautious", saga:"THE TROY SAGA — ACT II", title:"THE COST OF WAITING", text:"You wait. And in your waiting, you see what your men do when there is no general to stop them.\n\nThe temples burn first. Agamemnon's men drag a priestess from the temple of Athena herself.\n\nYou arrive to a city already broken. And to a goddess already furious.", choices:[{text:"Step in. Stop the desecration. Even now.",next:"speak_against_sack"},{text:"The city has fallen. Nothing can be undone.",next:"look_away"}]},
  sack_of_troy: { id:"sack_of_troy", saga:"THE TROY SAGA — ACT III", title:"THE CITY FALLS", text:"Troy burns.\n\nTen years of war reduced to one night of fire. The city that launched a thousand ships is falling. Your men move through the streets like shadows.\n\nThen you see it — Agamemnon's soldiers dragging a priestess from the Temple of Athena. They are laughing. The goddess's statue watches with stone eyes.\n\nSomething cold moves through you.", choices:[{text:"Intervene. This is a temple. Athena is watching.",next:"speak_against_sack"},{text:"Look away. This is war. This is what war is.",next:"look_away"},{text:"Get to the ships. Your job here is done.",next:"flee_to_ships"}]},
  mercy_priam: { id:"mercy_priam", saga:"THE TROY SAGA — ACT III", title:"THE OLD KING", text:"You find Priam at the altar of Zeus. Old. Weaponless. More ghost than king.\n\nHe doesn't beg. He just looks at you with eyes that have seen fifty years of war.\n\n\"Odysseus,\" he says. He knows your name.\n\nBehind you, you hear Agamemnon's men approaching.", choices:[{text:"Shield him from your own men. Let him live.",next:"speak_against_sack"},{text:"Step aside. This is not your call to make.",next:"look_away"}]},
  speak_against_sack: { id:"speak_against_sack", saga:"THE TROY SAGA — ACT III", title:"THE VOICE IN THE ASHES", text:"You step forward. You speak. The words come loud enough that even Agamemnon's men pause.\n\nThey don't listen — not fully. The damage is done. But somewhere above the smoke, in the cold grey sky, something watches.\n\nAthena.\n\nShe sees you. And for the first time in ten years, you feel like you might actually make it home.", choices:[{text:"Board your ship. Set sail for Ithaca.",next:"ending_blessed"}]},
  look_away: { id:"look_away", saga:"THE TROY SAGA — ACT III", title:"THE EYES OF STONE", text:"You look away.\n\nYou tell yourself it's pragmatism. Strategy. You can't stop the tide of ten years of war in one moment.\n\nBut the statue of Athena in the burning temple — her stone eyes follow you as you walk away.\n\nSome things, once seen and ignored, cannot be forgotten. Not by men. Not by gods.", choices:[{text:"Board your ship. Set sail for Ithaca.",next:"ending_cursed"}]},
  flee_to_ships: { id:"flee_to_ships", saga:"THE TROY SAGA — ACT III", title:"THE FIRST ONE OUT", text:"You make for the ships before the temples start to burn. Smart. Efficient.\n\nBut the sea is loud tonight. The waves slap the hull with a strange, deliberate rhythm. Your helmsman looks at you and says nothing.\n\nOut on the dark water, you could swear you see a figure beneath the waves. Watching.", choices:[{text:"Board your ship. Set sail for Ithaca.",next:"ending_unknown"}]},
  ending_blessed: { id:"ending_blessed", isEnding:true, endingType:"triumph", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"FAVORED BY GREY EYES", text:"", endingText:"The wind fills your sails from the moment you leave Troy's coast. It shouldn't be this easy — ten years of enemies don't just let you go. But the sea is calm, the stars are clear, and somewhere in the rigging you keep hearing a voice that isn't quite the wind.\n\nYou are not home yet. The ocean is long and the gods are complex.\n\nBut you left Troy with your honor.\n\nThe journey home has begun.", sagaCount:"1 of 9"},
  ending_cursed: { id:"ending_cursed", isEnding:true, endingType:"cursed", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"POSEIDON STIRS", text:"", endingText:"The fleet barely clears the coast of Troy when the storm hits. Waves like walls. Thunder that speaks in a voice older than language.\n\nYou hold the tiller and tell yourself it's just weather.\n\nBut your helmsman is weeping. And you know, somewhere deep in your chest, that this is not just weather.\n\nThe journey home will be long. Much longer than you planned.", sagaCount:"1 of 9"},
  ending_unknown: { id:"ending_unknown", isEnding:true, endingType:"unknown", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"THE WINE-DARK SEA", text:"", endingText:"The sea stretches before you — vast and unknowable. You left Troy before the worst of it. You're not guilty of the sacrilege. But you're not innocent either.\n\nThe gods don't grade on a curve.\n\nSomewhere ahead: the Cyclops. The Sirens. Circe's island. The Underworld itself.\n\nYou are Odysseus of Ithaca. And the ocean has plans for you.\n\nThe journey home will be... interesting.", sagaCount:"1 of 9"},
};

const TROY_CREW = {
  start: { id:"start", saga:"THE TROY SAGA — ACT I", title:"ANOTHER DAY, ANOTHER WALL", text:"You are one of thousands. A soldier of Ithaca, following the cleverest king in Greece to a war you didn't start.\n\nTen years. You've survived ten years. That already makes you exceptional.\n\nThen, one morning, word spreads through camp: the captain has a plan. Something about a horse.", choices:[{text:"Volunteer to go inside the horse. Prove your worth.",next:"crew_volunteer"},{text:"Keep your head down. Let someone else be the hero.",next:"crew_stays_back"}]},
  crew_volunteer: { id:"crew_volunteer", saga:"THE TROY SAGA — ACT II", title:"THE BELLY OF THE BEAST", text:"Odysseus picks you himself. That's either an honor or a death sentence.\n\nTwelve of you, packed into the horse's belly. The wood smells of fresh pine and panic. You've fought in open fields for ten years. This — cramped darkness, depending on deception — this is different.\n\nThe horse is dragged through the gates. Trojans cheer. They think they've won.\n\nHours later, in the deep silence of midnight, the soldier beside you — Elpenor, good man, terrible nerves — starts to shake. Then cough.", choices:[{text:"Clamp your hand over his mouth. Hard. Silence him.",next:"crew_silence"},{text:"Grab his hand instead. Steady him. Risk it.",next:"crew_comfort"}]},
  crew_stays_back: { id:"crew_stays_back", saga:"THE TROY SAGA — ACT II", title:"FROM THE SHORE", text:"You watch the horse roll through the gates from the deck of a ship. Smart call. Probably.\n\nThe night is long. Then — torchlight. The gates swing open. The men pour in.\n\nYou're rowing to shore before anyone gives the order. By the time you reach the streets of Troy, it's already chaos.\n\nA Trojan soldier — young, your age — stumbles into an alley. He drops his spear. He's not fighting anymore.", choices:[{text:"End it. He's the enemy.",next:"crew_kills"},{text:"Let him go. The war is already over.",next:"crew_spares"}]},
  crew_silence: { id:"crew_silence", saga:"THE TROY SAGA — ACT II", title:"HELD BREATH", text:"Elpenor's eyes go wide. He stares at you. You stare back. Don't. You will him. Please don't.\n\nThe footsteps below pause.\n\nThen pass.\n\nYou don't release your grip until you hear them fade. When you finally let go, Elpenor looks at you with something between gratitude and shame.\n\nAt midnight, you drop from the horse. Troy is yours.", choices:[{text:"Fight your way through to the palace gates.",next:"crew_sack_choice"},{text:"Find Elpenor first. Make sure he's holding together.",next:"crew_elpenor"}]},
  crew_comfort: { id:"crew_comfort", isEnding:true, endingType:"death", endingTitle:"THE HORSE BURNS", saga:"THE TROY SAGA — ACT II", title:"THE COST OF KINDNESS", text:"You squeeze his hand. He steadies — barely.\n\nThe cough comes anyway. Small. Almost nothing.\n\nBut Troy is very quiet at midnight.\n\nBelow, the footsteps stop. Voices. Getting louder.\n\nOdysseus's eyes find yours in the dark. He doesn't look angry. Just... tired.", endingText:"The horse burns with all of you inside it. Kindness, in the wrong moment, is still a mistake.\n\nElpenor survives, somehow. He never speaks of the horse again.\n\nBut when he finally gets home, he plants an olive tree. He names it after you.", sagaCount:"1 of 9"},
  crew_kills: { id:"crew_kills", saga:"THE TROY SAGA — ACT III", title:"THE COST OF WAR", text:"You do what soldiers do. The Trojan falls. You move on.\n\nAnd yet. And yet.\n\nHis face stays with you through the burning streets, through the ships, through the sea. You are not the first soldier to carry a face like that. You will not be the last.", choices:[{text:"Board the ship. Set sail. Leave it behind.",next:"crew_ending_haunted"}]},
  crew_spares: { id:"crew_spares", saga:"THE TROY SAGA — ACT III", title:"A CHOICE NOT IN THE HISTORIES", text:"You let him go. He runs. He doesn't look back.\n\nSomething shifts in the smoke above you. An invisible presence — watchful. Warm.\n\nYou don't know why you did it. Maybe ten years of war is enough. Maybe he reminded you of someone.\n\nEither way — the war is over. And you're still standing.", choices:[{text:"Board the ship. Set sail. Go home.",next:"crew_ending_light"}]},
  crew_sack_choice: { id:"crew_sack_choice", saga:"THE TROY SAGA — ACT III", title:"THE STREETS OF TROY", text:"Troy is burning. You're a soldier in a burning city. In the chaos, you see Agamemnon's men dragging a priestess from the temple of Athena.\n\nOdysseus is not here. No one important is watching.\n\nOr so you think.", choices:[{text:"Step in. Pull them off her.",next:"crew_saves_priestess"},{text:"Keep moving. Stay alive.",next:"crew_ending_haunted"}]},
  crew_elpenor: { id:"crew_elpenor", saga:"THE TROY SAGA — ACT III", title:"LOOK AFTER EACH OTHER", text:"Elpenor is standing outside the horse, disoriented, overwhelmed. The city is burning. Men are streaming past.\n\nYou grab his arm. He looks at you — that same look from inside the horse. \"I owe you,\" he says.\n\n\"Buy me a drink in Ithaca,\" you tell him.\n\nYou fight through the burning city together.", choices:[{text:"Get to the ships. Get home.",next:"crew_ending_together"}]},
  crew_saves_priestess: { id:"crew_saves_priestess", saga:"THE TROY SAGA — ACT III", title:"GREY EYES IN THE SMOKE", text:"They back off when they see your face. Something in your eyes — or maybe the goddess herself put steel in your voice.\n\nThe priestess looks at you. She says one word in Trojan.\n\nYou don't speak Trojan. But you know what gratitude sounds like.", choices:[{text:"Get to the ships. Set sail.",next:"crew_ending_light"}]},
  crew_ending_light: { id:"crew_ending_light", isEnding:true, endingType:"triumph", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"CLEAN HANDS", endingText:"The sea is calm when you leave Troy. Calmer than it has any right to be after ten years of war.\n\nYou're a soldier. You didn't start this war and you didn't end it. But you made choices inside it — small ones, human ones — and they add up.\n\nOdysseus sits at the bow, staring at the horizon. You don't know what he sees.\n\nYou're going home. With clean hands.\n\nThat's enough. That's everything.", sagaCount:"1 of 9"},
  crew_ending_haunted: { id:"crew_ending_haunted", isEnding:true, endingType:"cursed", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"WHAT SOLDIERS CARRY", endingText:"The ship leaves Troy on a grey morning. You stand at the stern, watching the smoke rise until the city disappears below the horizon.\n\nYou did what soldiers do. You survived. You followed orders. You looked away when looking away was the smart move.\n\nThe sea ahead is long and strange. Odysseus warns there will be monsters, sorcerers, gods.\n\nBut you already know that the hardest things to face are the ones you carry inside you.\n\nThe journey home has begun.", sagaCount:"1 of 9"},
  crew_ending_together: { id:"crew_ending_together", isEnding:true, endingType:"unknown", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"BROTHERS IN THE DARK", endingText:"You find your ship with Elpenor at your side. He's talking too much — he always talks too much when he's scared — but his voice is familiar. Steady.\n\nOdysseus counts heads as you board. He sees you. He nods once.\n\nFrom Odysseus of Ithaca, that's practically a speech.\n\nThe sea is dark and the journey is long. But you have your crew. And on the wine-dark sea, that's the only armor that matters.", sagaCount:"1 of 9"},
};

const TROY_GOD = {
  start: { id:"start", saga:"THE TROY SAGA — FROM OLYMPUS", title:"CHOOSE YOUR DIVINITY", text:"From high above, the gods watch Troy burn.\n\nYou are not human. You do not bleed. You do not fear the dark waters or the wooden horse or the spears of ten thousand soldiers.\n\nYou are something older. Something permanent.\n\nBut even gods have favorites. Even gods have chosen sides.", choices:[{text:"I am Athena — goddess of wisdom and war",next:"god_athena_start"},{text:"I am Poseidon — god of the sea and earth-shaker",next:"god_poseidon_start"}]},
  god_athena_start: { id:"god_athena_start", saga:"THE TROY SAGA — ATHENA'S GAMBIT", title:"THE GREY-EYED GODDESS", text:"You are Athena. Daughter of Zeus, born in full armor, goddess of the calculated mind.\n\nFor ten years you have watched Odysseus — the cleverest of the Greeks, your favorite mortal — batter himself against Troy's walls.\n\nTonight, you have an idea.\n\nA horse.", choices:[{text:"Visit Odysseus in a dream. Give him the plan.",next:"athena_gives_plan"},{text:"Let him figure it out. He's clever enough.",next:"athena_waits"}]},
  god_poseidon_start: { id:"god_poseidon_start", saga:"THE TROY SAGA — POSEIDON'S WRATH", title:"THE EARTH-SHAKER", text:"You are Poseidon. Brother of Zeus, lord of the deep places, master of the ocean that lies between every man and his home.\n\nTroy was your city once. You helped build those walls. And now the Greeks tear them down with a trick. A wooden trick.\n\nYou are not angry.\n\nYou are patient. And patience, in a god, is more dangerous than rage.", choices:[{text:"Send a storm to destroy the Greek fleet. Now.",next:"poseidon_storm_now"},{text:"Wait. Let them win their little war. Then act.",next:"poseidon_waits"}]},
  athena_gives_plan: { id:"athena_gives_plan", saga:"THE TROY SAGA — ATHENA'S GAMBIT", title:"THE DREAM", text:"You step into his dream like stepping into shallow water. Odysseus stirs — he always half-knows when you visit, that rare quality that makes him worth watching.\n\nYou show him the horse.\n\nHe wakes before dawn with his jaw set and his eyes bright. You watch him walk to Agamemnon's tent. You watch the plan take shape.\n\nTroy will fall. But there is still the question of afterward.", choices:[{text:"Protect the temples. Keep the soldiers from desecrating sacred ground.",next:"athena_protects"},{text:"Troy has fallen. Your work here is done.",next:"athena_withdraws"}]},
  athena_waits: { id:"athena_waits", saga:"THE TROY SAGA — ATHENA'S GAMBIT", title:"FAITH IN MORTALS", text:"You wait.\n\nIt takes Odysseus three more days — longer than it would have if you'd intervened. There are wrong turns, false starts, one terrible idea involving a tunnel.\n\nBut then: the horse. His own design. His own genius.\n\nYou didn't give this to him. He found it himself.\n\nSomething like pride moves through you, which is unusual for a goddess.", choices:[{text:"Bless the plan now. Make sure it works.",next:"athena_protects"},{text:"Stay back. See if a mortal's plan holds without divine help.",next:"athena_withdraws"}]},
  poseidon_storm_now: { id:"poseidon_storm_now", saga:"THE TROY SAGA — POSEIDON'S WRATH", title:"TOO SOON", text:"You raise the sea.\n\nThe waves come like walls, dark and cold, and the Greek ships scatter. Agamemnon's fleet is cut in half before they reach Troy.\n\nBut Zeus sees what you've done. And Zeus is... displeased.\n\n\"Brother,\" he says, in that voice like slow thunder. \"The Fates have already decided Troy falls. You cannot stop it.\"\n\nYou lower the storm. You lower your eyes.\n\nFor now.", choices:[{text:"Fine. Troy falls. But the Greeks will not reach home easily.",next:"poseidon_plans"}]},
  poseidon_waits: { id:"poseidon_waits", saga:"THE TROY SAGA — POSEIDON'S WRATH", title:"THE LONG GAME", text:"Troy falls in a single night.\n\nYou watch from the deep water. The wooden horse. The fire. Agamemnon's soldiers desecrating temples, dragging people from altars, laughing in the ruins of your walls.\n\nOne of them violates the temple of Athena herself.\n\nYou wait for your sister to act. She does not — yet.\n\nYou feel something shift. An opportunity.", choices:[{text:"Go to Athena. Suggest you both punish the Greeks together.",next:"poseidon_alliance"},{text:"Act alone. The sea answers to you, not the other gods.",next:"poseidon_plans"}]},
  athena_protects: { id:"athena_protects", saga:"THE TROY SAGA — ATHENA'S GAMBIT", title:"WHAT GODS PROTECT", text:"You move through the burning city like cold smoke.\n\nWhere soldiers approach the sacred places, their feet slow. Their torches gutter. They feel that particular sensation mortals get when a god stands nearby — the hair rising, the sudden sense of being very, very small.\n\nMost of them find other places to be.\n\nBut not Ajax. He goes to the temple anyway.", choices:[{text:"Punish Ajax. Make an example of his arrogance.",next:"athena_punishes_ajax"},{text:"Focus on Odysseus. Guide him safely to his ships.",next:"athena_guides_odysseus"}]},
  athena_withdraws: { id:"athena_withdraws", saga:"THE TROY SAGA — ATHENA'S GAMBIT", title:"WHAT GODS ALLOW", text:"You watch.\n\nYou watch Agamemnon's soldiers tear through the city. You watch the temples desecrated, the altars overturned. You watch Ajax drag a priestess from your own temple — from your own altar — and laugh.\n\nYou feel something cold and very old move through you.\n\nGratitude has an expiration date. Even yours.", choices:[{text:"Withdraw your favor from the Greeks. Let the sea take them.",next:"athena_turns"}]},
  poseidon_plans: { id:"poseidon_plans", saga:"THE TROY SAGA — POSEIDON'S WRATH", title:"THE SEA HAS PATIENCE", text:"Troy is ash. The Greeks are celebrating. Loading their ships with gold and the bones of a city they spent ten years breaking.\n\nYou wait until the last ship leaves the harbor.\n\nThen you begin.", choices:[{text:"Target Odysseus first. He is Athena's favorite — that alone is enough.",next:"poseidon_targets_odysseus"},{text:"Target Agamemnon's fleet. The greatest arrogance deserves the greatest fall.",next:"poseidon_targets_agamemnon"}]},
  poseidon_alliance: { id:"poseidon_alliance", saga:"THE TROY SAGA — POSEIDON'S WRATH", title:"UNLIKELY ALLIES", text:"Athena is already on Olympus when you arrive. She sits with her owl and her armor and the expression of someone who has already considered fourteen possible outcomes.\n\n\"The sacrilege of Ajax,\" you say.\n\nShe looks at you. Her grey eyes give nothing away. But you know that look. That is the look of a goddess who is also angry.\n\n\"What do you propose, brother?\"", choices:[{text:"Together we scatter the Greek fleet on the rocks.",next:"poseidon_ending_storm"},{text:"Let them sail. And let Odysseus carry our judgment home with him.",next:"poseidon_targets_odysseus"}]},
  athena_punishes_ajax: { id:"athena_punishes_ajax", isEnding:true, endingType:"triumph", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"THE GODDESS'S JUSTICE", endingText:"Ajax the Lesser — who thought himself untouchable — learns what it means to offend a goddess in her own house.\n\nYou guide his fleet to the rocks. One captain. One lesson.\n\nThe other Greeks watch his ship go down and grow very quiet.\n\nOdysseus, at the stern of his ship, looks up at the sky. He cannot see you. But he raises one hand, just slightly, in something like acknowledgment.\n\nThe grey-eyed goddess sails with him.\n\nFor now.", sagaCount:"1 of 9"},
  athena_guides_odysseus: { id:"athena_guides_odysseus", isEnding:true, endingType:"triumph", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"THE FAVORITE", endingText:"You find Odysseus at the docks, loading his ship, head down against the smoke.\n\nYou cannot appear to him directly — not yet — so you become the wind. You fill his sails. You guide his hand on the tiller.\n\nHe sails away from Troy before the worst of it. Before the sacrilege that will curse the others.\n\nHe will face trials ahead. Many. But he will face them with the help of a goddess who has never entirely stopped watching.\n\nThat has to count for something.", sagaCount:"1 of 9"},
  athena_turns: { id:"athena_turns", isEnding:true, endingType:"cursed", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"GREY EYES, COLD NOW", endingText:"You go to Poseidon. It is a short conversation.\n\nHe smiles — which is rare for him. \"I'll handle the sea,\" he says. \"You handle the homeward winds.\"\n\nYou handle the homeward winds. By removing them entirely.\n\nThe Greek fleet sits in dead water as Troy's smoke rises behind them. Agamemnon looks at the sky with the expression of a man beginning to understand.\n\nOdysseus is the only one you spare. Barely. You still need him for something.\n\nBut the others? The others are going to find the sea a very long road.", sagaCount:"1 of 9"},
  poseidon_targets_odysseus: { id:"poseidon_targets_odysseus", isEnding:true, endingType:"cursed", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"THE GOD IN THE DEEP", endingText:"You wait until his fleet is three days out from Troy. Far enough that help won't come. Close enough that he can still see the smoke.\n\nThen you wake the deep currents. The cold places where the ocean floor drops away into darkness.\n\nOdysseus's ships are good ships. He is a good sailor.\n\nBut the sea is very old. And you are very patient.\n\nHe won't be home for twenty years.\n\nYou can wait that long.", sagaCount:"1 of 9"},
  poseidon_targets_agamemnon: { id:"poseidon_targets_agamemnon", isEnding:true, endingType:"triumph", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"THE KING OF KINGS FALLS", endingText:"You send the storm into Agamemnon's fleet like a fist.\n\nOne hundred and twenty ships. The greatest armada the world has ever seen.\n\nThe rocks off Cape Caphereus remember this night for a thousand years.\n\nOdysseus's ships — smaller, faster, a little south of the main fleet — survive. He was never the target.\n\nHe looks back at the storm eating Agamemnon's ships and his face is unreadable. Smart man. He knows better than to look relieved.\n\nThe sea has spoken. And the sea is satisfied.", sagaCount:"1 of 9"},
  poseidon_ending_storm: { id:"poseidon_ending_storm", isEnding:true, endingType:"triumph", saga:"THE TROY SAGA — EPILOGUE", endingTitle:"DIVINE RETRIBUTION", endingText:"Together, you and Athena raise a storm that historians will call a natural disaster.\n\nIt is not a natural disaster.\n\nThe Greek fleet scatters across the Aegean like leaves. Agamemnon limps home to a wife who has been very busy in his absence. Ajax is given the rocks as a gift.\n\nOdysseus escapes — Athena makes sure of that. Her fingers are in every favorable wind.\n\nBut his journey home will be long. You will make sure of that.\n\nA goddess and a sea-god, in agreement. The Greeks should have been more careful about whose temples they burned.", sagaCount:"1 of 9"},
};

// ============================================================
// CYCLOPS SAGA STORIES
// ============================================================

const CYCLOPS_ODYSSEUS = {
  start: { id:"start", saga:"THE CYCLOPS SAGA — ACT I", title:"THE ISLAND", text:"The sea has been generous since Troy. But your provisions are low and your men are hungry.\n\nAn island rises from the morning mist — green, wild, untouched. Goats roam the cliffs. Massive sheep graze in valleys below. Everything is enormous here. The fruit. The tracks in the mud.\n\nToo enormous.\n\nYou feel it before you can name it. Something large lives on this island. Something that has never learned to share.", choices:[{text:"Make camp on the beach. Don't touch the animals. This isn't our land.",next:"island_cautious"},{text:"The men need to eat. Take twelve men and explore inland.",next:"island_explore"}]},
  island_cautious: { id:"island_cautious", saga:"THE CYCLOPS SAGA — ACT I", title:"CURIOSITY", text:"You make camp on the beach. But the footprints lead inland — each one the size of a shield — and you are Odysseus. Curiosity has always been your most dangerous quality.\n\nYou take twelve men. You follow the trail.\n\nThe cave is enormous: stacked with cheeses the size of boulders, pens full of lambs, the smell of wool and something ancient.\n\nElpenor looks at you. 'Take what we need and go,' he says quietly.\n\nYou could. You should.", choices:[{text:"Take what you can carry. Leave now.",next:"cave_too_late"},{text:"Wait for the owner. Zeus protects guests.",next:"cave_wait"}]},
  island_explore: { id:"island_explore", saga:"THE CYCLOPS SAGA — ACT I", title:"THE SHEPHERD'S CAVE", text:"You find the cave by following the sound of bleating. The entrance could swallow a ship. Inside: mountains of cheese, pens of lambs, the organized chaos of something that tends its flock every morning.\n\nThe men fill their arms. They're ready to go.\n\nBut you're curious about the host. You always are.", choices:[{text:"Take what you can carry. Leave now.",next:"cave_too_late"},{text:"Wait. I want to meet whoever lives here.",next:"cave_wait"}]},
  cave_too_late: { id:"cave_too_late", saga:"THE CYCLOPS SAGA — ACT I", title:"THE SHADOW", text:"You're loading a skin of cheese onto your shoulders when the light changes.\n\nThe shadow falls across the cave entrance like a curtain.\n\nThen the boulder rolls.\n\nAnd then — him.", choices:[{text:"Stand your ground. Face him directly.",next:"polyphemus_arrives"},{text:"Press against the cave wall. Don't speak first.",next:"polyphemus_arrives"}]},
  cave_wait: { id:"cave_wait", saga:"THE CYCLOPS SAGA — ACT I", title:"THE HOST ARRIVES", text:"You wait. Hours pass. The cave grows dark.\n\nThen — thunder. Not from the sky. From the hillside. A pile of firewood that would fill three ships crashes to the ground inside the cave.\n\nAnd then: the boulder. Rolled over the entrance like a cork in a bottle. He didn't even strain.\n\nThe firelight reveals him.\n\nOne eye.", choices:[{text:"Step forward. Invoke Zeus's protection of guests.",next:"polyphemus_arrives"},{text:"Stay in the shadows. Don't speak first.",next:"polyphemus_arrives"}]},
  polyphemus_arrives: { id:"polyphemus_arrives", saga:"THE CYCLOPS SAGA — ACT I", title:"POLYPHEMUS", text:"One eye. The size of a cartwheel. He moves through his cave the way a storm moves — without considering what's beneath it.\n\nHe sees you by the fire. A long silence.\n\n'Strangers.' His voice is a rockslide. 'Who are you? Where is your ship?'\n\nYour men are pressed against the cave wall. Polites — your youngest captain, bravest man you have — is standing closest to you. His jaw is set. He's ready for whatever you decide.", choices:[{text:"Answer honestly. We are Greeks. Zeus demands you show hospitality.",next:"invoke_zeus"},{text:"Say nothing yet. Watch. Think. You need a plan first.",next:"watch_and_plan"}]},
  invoke_zeus: { id:"invoke_zeus", saga:"THE CYCLOPS SAGA — ACT I", title:"WHAT GODS?", text:"'We are soldiers of Agamemnon, returning from Troy,' you say, voice steady. 'Zeus himself commands hospitality to strangers. We ask for the guest-right.'\n\nPolyphemus laughs.\n\nThe sound shakes dust from the ceiling.\n\n'Where is Zeus?' he says. 'Not here. I am Poseidon's son. I do not fear Zeus.'\n\nHe reaches out — not even maliciously, more like a man picking up a tool — and that is the end of two of your men.", choices:[{text:"'We have wine. Strong wine. A gift from the gods themselves.'",next:"wine_gambit"},{text:"Fall back. Watch. Plan.",next:"watch_and_plan"}]},
  watch_and_plan: { id:"watch_and_plan", saga:"THE CYCLOPS SAGA — ACT II", title:"SURVIVE", text:"You spend the night watching.\n\nHe sleeps. He's enormous and violent and stupid and there is a pattern to him — morning, flock out, boulder rolls, evening, flock in, boulder rolls, darkness.\n\nTwo options form in the dark.\n\nThe wooden stake — one of his own tools, the length of a ship's mast, with a point you could sharpen. Drive it into his eye.\n\nOr: the wine. You have Maron's wine from Troy — so strong it needs to be diluted twenty to one. Get him drunk first. Then the stake.", choices:[{text:"The stake. Sharpen it now while he sleeps.",next:"stake_approach"},{text:"The wine first. Get him drunk. Get him talking.",next:"wine_gambit"}]},
  wine_gambit: { id:"wine_gambit", saga:"THE CYCLOPS SAGA — ACT II", title:"NOBODY", text:"'Great Cyclops,' you say, stepping forward with the wineskin. 'We have a gift. Wine from the gods themselves.'\n\nHe takes the bowl. Drinks. His one eye widens.\n\n'More,' he says. 'And tell me your name, stranger. I'll give you a gift in return.'\n\nThis is the moment. The name you give him now will either save you or condemn you.", choices:[{text:"'My name is Nobody.'",next:"nobody_named"},{text:"'I am Odysseus of Ithaca. The man who brought down Troy.'",next:"name_too_soon"}]},
  nobody_named: { id:"nobody_named", saga:"THE CYCLOPS SAGA — ACT II", title:"THE GIFT", text:"'Nobody,' you say. 'My name is Nobody.'\n\nHe laughs — a sound like a landslide — and drinks again. And again. His eye grows glassy.\n\n'My gift to Nobody,' he slurs, 'is that Nobody will be eaten last.'\n\nHe falls.\n\nThe cave floor shakes when he hits it.\n\nYou look at your men. You look at the stake.\n\nTonight.", choices:[{text:"Drive the stake now, while he's deepest in sleep.",next:"stake_approach"}]},
  name_too_soon: { id:"name_too_soon", isEnding:true, endingType:"death", endingTitle:"HE KNEW YOUR NAME", saga:"THE CYCLOPS SAGA — ACT II", title:"PRIDE BEFORE THE FALL", text:"Something flashes in his one eye. Not respect. Recognition.\n\n'Odysseus.' He says your name slowly, tasting it. 'My father told me about you. He said you'd come.'\n\nHe sobers up faster than seems possible.", endingText:"Poseidon's son knows who you are now. And Poseidon's son does not forgive.\n\nThe wine was meant to make him forget. Instead you gave him something to hold.\n\nSome doors, once opened, cannot be closed.\n\nPolites never makes it home.", sagaCount:"2 of 9"},
  stake_approach: { id:"stake_approach", saga:"THE CYCLOPS SAGA — ACT II", title:"THE WEAPON", text:"The stake is the length of a ship's mast. You sharpen it in the dark, passing it between trembling hands, the scraping sound hidden under the Cyclops's breathing.\n\nYou need four men to drive it with enough force.\n\nPolites is at your shoulder before you even turn around.\n\n'I'm in,' he says. He doesn't wait to be asked. He never does.\n\nYou look at him — young face, no fear in it, or fear buried so deep it might as well not exist — and something tightens in your chest.", choices:[{text:"'I need you, Polites. Take the front position.'",next:"polites_chosen"},{text:"'Stay back. I'm choosing the older men for this.'",next:"polites_refused"}]},
  polites_chosen: { id:"polites_chosen", saga:"THE CYCLOPS SAGA — ACT II", title:"BEFORE THE STRIKE", text:"Four men. The stake in the fire until the tip glows orange.\n\nYou give the signal.\n\nThe Cyclops stirs in his sleep — a massive, wet sound, like a landslide breathing. His hand moves. A blind, unconscious gesture, reaching for something in his sleep.\n\nPolites doesn't have time to step back.\n\nIt happens between one breath and the next. The casual cruelty of something that doesn't know its own strength.\n\nAnd then it's quiet again, except for one man's barely-suppressed sob.", choices:[{text:"'For Polites.' Drive the stake.",next:"the_blinding"}]},
  polites_refused: { id:"polites_refused", saga:"THE CYCLOPS SAGA — ACT II", title:"HE CAME ANYWAY", text:"'Stay back,' you tell him quietly. 'I'm taking the older men.'\n\nPolites nods. He understands.\n\nBut when you count the men taking positions around the stake, there are four where there should have been three.\n\nHe's there. His jaw set. His eyes forward.\n\nYou don't have time to argue.\n\nThe Cyclops's hand moves in his sleep.\n\nBetween one breath and the next, Polites is gone.", choices:[{text:"'For Polites.' Drive the stake.",next:"the_blinding"}]},
  the_blinding: { id:"the_blinding", saga:"THE CYCLOPS SAGA — ACT II", title:"THE BLINDING", text:"The stake goes in.\n\nThe scream is a sound you will never stop hearing. Not for the rest of the voyage. Not when you finally reach Ithaca. Not ever. It fills the cave, fills your skull, shakes the boulder in the entrance.\n\nHe tears the stake free. Swings blind. Your men press flat against the walls.\n\nOutside, other Cyclopes gather at the noise.\n\n'POLYPHEMUS! Who hurt you?'\n\nHe screams his answer into the dark: 'NOBODY! NOBODY IS HURTING ME!'\n\nA pause. Then: 'Well — if nobody is hurting you, it must be a sickness from your father Zeus. Pray to Poseidon.'\n\nThey leave.\n\nHe weeps. He rolls back the boulder at dawn for his sheep.", choices:[{text:"Lash yourselves under the rams. Go out with the flock.",next:"escape_under_sheep"},{text:"Rush the gap when the boulder moves.",next:"escape_rushed"}]},
  escape_under_sheep: { id:"escape_under_sheep", saga:"THE CYCLOPS SAGA — ACT III", title:"UNDER THE RAMS", text:"The wool is thick and warm and you hold on until your arms shake.\n\nThe sheep file out. His hands move over every one — checking for stowaways. But he runs his hands over the backs, and you're underneath.\n\nThe sunlight hits your face.\n\nYou let go. You land on your feet. And then you run.\n\nAll of you. Every last man still breathing. Running for the ships, not looking back, the Cyclops's screaming fading behind you.\n\nThe oars hit the water before anyone speaks.", choices:[{text:"Get clear. Stay silent. Get home.",next:"on_the_boats"},{text:"Get clear. Then let him know who won.",next:"on_the_boats"}]},
  escape_rushed: { id:"escape_rushed", saga:"THE CYCLOPS SAGA — ACT III", title:"TOO BOLD", text:"Three men through the gap before his hand comes down.\n\nYou make it. Some don't.\n\nOn the beach, counting who's behind you, the number is smaller than it should be.\n\nYou run for the ships. The sea receives you.", choices:[{text:"Row. Just row. Get away clean.",next:"on_the_boats_costly"},{text:"Row — but someone has to know who did this.",next:"on_the_boats_costly"}]},
  on_the_boats: { id:"on_the_boats", saga:"THE CYCLOPS SAGA — ACT III", title:"THE NAME", text:"The oars bite the water. The island is shrinking.\n\nPolyphemus is on the cliff above — enormous, blind, howling toward the sound of the oars. He can't see you. He doesn't know which way to throw the rocks.\n\nYou are going to make it.\n\nAnd then something rises in your chest — grief for Polites, rage at the cave, pride in the plan, the desperate human need to be KNOWN — and you open your mouth.", choices:[{text:"Stay silent. The oars are your voice. Get away.",next:"ending_silent_victory"},{text:"'CYCLOPS! YOU WANT TO KNOW WHO DID THIS?'",next:"name_shout"}]},
  on_the_boats_costly: { id:"on_the_boats_costly", saga:"THE CYCLOPS SAGA — ACT III", title:"WHAT IT COST", text:"The ships pull away. You count who made it.\n\nThe number is what it is.\n\nPolyphemus howls toward the sound of the oars from his cliff. Blind. Furious. Not able to reach you.\n\nYou row.\n\nAnd then the need rises in you — grief, fury, the desperate need to make him know — and your mouth opens.", choices:[{text:"Row. Just row. Swallow it.",next:"ending_silent_victory"},{text:"He needs to know. They all need to know.",next:"name_shout"}]},
  name_shout: { id:"name_shout", saga:"THE CYCLOPS SAGA — ACT III", title:"I AM ODYSSEUS", text:"'CYCLOPS!' Your voice carries over the water. The oars stop.\n\n'THE MAN WHO BLINDED YOU IS ODYSSEUS! SON OF LAERTES! KING OF ITHACA! REMEMBER THAT NAME!'\n\nYour men are staring at you.\n\nOn the cliff, Polyphemus goes very still. Then he raises both hands to the sky.\n\n'Father,' he says — quietly, terribly — 'Poseidon. Earth-Shaker. If I am truly your son — let Odysseus of Ithaca never reach home. Or if he must — let him arrive late. Alone. On a stranger's ship. To find nothing but grief.'\n\nThe prayer dissolves into the sky.\n\nThe wind goes still.", choices:[{text:"'I know what I've done.' You sit down. You keep rowing.",next:"ending_my_goodbye_aware"},{text:"You keep rowing. It was worth it. He'll know your name forever.",next:"ending_my_goodbye_proud"}]},
  ending_silent_victory: { id:"ending_silent_victory", isEnding:true, endingType:"triumph", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"THE QUIET VICTORY", endingText:"The island disappears behind you.\n\nYou gave him nothing. No name, no direction, no pride to punish. You are a ghost to him — a man called Nobody who was never there.\n\nPolites is gone. That weight will not lift. You will carry it all the way to Ithaca, if you reach Ithaca, and you will set it down gently when you arrive and it will still be there in the morning.\n\nBut you are alive. Your men are alive. The sea is open.\n\nThere is a version of Odysseus that shouted his name just now. That version has a very long road ahead.\n\nYou chose differently.", sagaCount:"2 of 9"},
  ending_my_goodbye_aware: { id:"ending_my_goodbye_aware", isEnding:true, endingType:"cursed", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"MY GOODBYE", endingText:"The wind is still.\n\nSomewhere in that stillness you feel grey eyes on you — Athena, watching from whatever distance gods keep. Not angry. Something worse: disappointed in a way that looks almost like love.\n\n'You always have to be known,' she says. The words arrive as a feeling, not a sound.\n\n'I know,' you say, to the open water.\n\nThe silence stretches.\n\nThen the wind returns — slowly, grudgingly — and Ithaca is still, technically, a direction.\n\nBut the sea between here and home just got longer. And you are going to feel every mile of it.", sagaCount:"2 of 9"},
  ending_my_goodbye_proud: { id:"ending_my_goodbye_proud", isEnding:true, endingType:"cursed", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"THE NAME THAT CURSED YOU", endingText:"The wind seems fine. The sea seems fine. You did what needed to be done. You survived. You won.\n\nIt seems fine all the way until the storm hits.\n\nAnd the storm after that. And the island after that. And the ten years that follow — each one a different obstacle, each one a gift from a god with an excellent memory.\n\nSomewhere in that long dark journey, you will try to remember: was there a moment? A moment when the wind went still and something waited?\n\nYou cannot remember stopping to listen.\n\nPolyphemus prayed to his father with your name in his mouth.\n\nPoseidon never forgets a name.", sagaCount:"2 of 9"},
};

const CYCLOPS_CREW = {
  start: { id:"start", saga:"THE CYCLOPS SAGA — ACT I", title:"TWELVE OF YOU", text:"Odysseus chose twelve men to go inland. You were one of them.\n\nYou didn't volunteer. He just looked at you and nodded, the way he does — as if he already knew what you were going to do before you did.\n\nThe cave was enormous. The footprints were enormous. Everything on this island was enormous.\n\nYou should have left when Elpenor said to leave.", choices:[{text:"'Elpenor was right. I'm going to say something.'",next:"crew_speaks_up"},{text:"Odysseus knows what he's doing. Stay quiet and follow his lead.",next:"crew_follows"}]},
  crew_speaks_up: { id:"crew_speaks_up", saga:"THE CYCLOPS SAGA — ACT I", title:"SPEAKING UP", text:"'This is a mistake,' you say quietly to Odysseus. 'The tracks. The size of this place. We should go.'\n\nHe looks at you. Something moves behind his eyes — he knows you're right, you can see it — and then he sets his jaw.\n\n'We wait,' he says.\n\nYou wait.\n\nThe boulder rolls.", choices:[{text:"Stay close to Odysseus. You'll need to trust him now.",next:"crew_trapped"}]},
  crew_follows: { id:"crew_follows", saga:"THE CYCLOPS SAGA — ACT I", title:"THE WAIT", text:"You wait in the cave.\n\nYou eat some of the cheese. The lambs bleat. Polites — always the one to keep people calm — makes a quiet joke. A few men laugh.\n\nThen the boulder rolls.\n\nAnd none of that matters anymore.", choices:[{text:"Press against the wall. Watch what Odysseus does.",next:"crew_trapped"}]},
  crew_trapped: { id:"crew_trapped", saga:"THE CYCLOPS SAGA — ACT II", title:"THE CAVE", text:"Polyphemus is what he is.\n\nTwo men gone before anyone finished processing the situation. The boulder back in place. The cave sealed.\n\nOdysseus is already thinking — you can see it in his face, the way everything goes still in him when the calculation begins. The rest of you are just trying to keep breathing.\n\nPolites is beside you. His shoulder pressed against yours. His presence is the only thing keeping the panic from taking over.\n\n'He has a plan,' Polites says quietly. 'He always has a plan.'\n\nYou look at the boulder.", choices:[{text:"'Polites is right. Trust Odysseus. Stay focused.'",next:"crew_the_night"},{text:"'We can't just wait. We need to do something ourselves.'",next:"crew_the_night"}]},
  crew_the_night: { id:"crew_the_night", saga:"THE CYCLOPS SAGA — ACT II", title:"THE LONG NIGHT", text:"Odysseus lays it out in the dark — barely a whisper. The stake. The fire. Four men to drive it home.\n\nHe doesn't pick you. He picks Elpenor, Perimedes, and two of the older soldiers.\n\nPolites is standing right there. His jaw tightens. You can see he wants to volunteer.\n\nThe Cyclops stirs in his sleep. His hand sweeps out — blind, massive, half-conscious — and in a fraction of a second you see what's about to happen.", choices:[{text:"Grab Polites. Pull him back hard.",next:"crew_saves_polites"},{text:"Everything happens too fast. You can't reach him in time.",next:"crew_loses_polites"}]},
  crew_saves_polites: { id:"crew_saves_polites", saga:"THE CYCLOPS SAGA — ACT II", title:"YOUR HAND", text:"Your hand finds his arm and you pull — hard, harder than you've ever pulled anything.\n\nPolites stumbles into you. The Cyclops's hand closes on empty air.\n\nPolites looks at you. He doesn't say anything. He doesn't have to.\n\nThe stake goes into the fire.\n\nOdysseus counts to thirty.", choices:[{text:"Take your position. You're part of this now.",next:"crew_blinding_polites_lived"}]},
  crew_loses_polites: { id:"crew_loses_polites", saga:"THE CYCLOPS SAGA — ACT II", title:"TOO SLOW", text:"He's gone before you could move.\n\nThe cave goes silent in a way that has nothing to do with sound. The men don't look at each other. Odysseus goes very still — that particular stillness he has when he's burying something he can't afford to feel yet.\n\n'Tonight,' he says. That's all.\n\nThe stake goes into the fire.", choices:[{text:"Take your position. For Polites.",next:"crew_blinding_polites_gone"}]},
  crew_blinding_polites_lived: { id:"crew_blinding_polites_lived", saga:"THE CYCLOPS SAGA — ACT II", title:"THE STRIKE", text:"The stake goes in.\n\nThe scream fills everything. The cave. Your skull. The island outside. You press flat against the wall while he swings blind through the smoke.\n\nOutside: 'POLYPHEMUS! Who hurt you?'\n\n'NOBODY! NOBODY DID THIS!'\n\nThe other Cyclopes leave. He rolls the boulder aside at dawn.\n\nYou grab the wool of the nearest ram and hold on.", choices:[{text:"Go out with the sheep. Keep silent.",next:"crew_escape_polites_lived"}]},
  crew_blinding_polites_gone: { id:"crew_blinding_polites_gone", saga:"THE CYCLOPS SAGA — ACT II", title:"FOR POLITES", text:"The stake goes in.\n\nThe scream fills the cave. The island. The whole quiet morning.\n\n'NOBODY DID THIS TO ME!'\n\nThe other Cyclopes leave.\n\nYou grab the wool of a ram and press your face into it. It smells like lanolin and animal warmth and somehow that is the thing that makes your eyes burn.\n\nPolites should be here.", choices:[{text:"Go out with the sheep. Keep silent.",next:"crew_escape_polites_gone"}]},
  crew_escape_polites_lived: { id:"crew_escape_polites_lived", saga:"THE CYCLOPS SAGA — ACT III", title:"OUT", text:"Sunlight. Running. The ships.\n\nPolites is behind you — running hard, a bruise on his arm, alive.\n\nOn the ship, as the oars bite the water, Odysseus stands at the stern. His mouth is opening. You can see it — the pride, the need, the name rising in his throat.\n\nYou are close enough to reach him.", choices:[{text:"Grab his arm. 'Don't say it. Please.'",next:"crew_ending_holds_odysseus"},{text:"It's his victory. His grief. Let him speak.",next:"crew_ending_watches_shout"}]},
  crew_escape_polites_gone: { id:"crew_escape_polites_gone", saga:"THE CYCLOPS SAGA — ACT III", title:"THE COUNT", text:"Sunlight. Running. The ships.\n\nYou count who's behind you. The number is what it is.\n\nOn the ship, Odysseus stands at the stern as the oars bite the water. You can see him deciding — the careful Odysseus vs. the proud Odysseus — and you know which one is winning.\n\nHis mouth opens.", choices:[{text:"'Odysseus. Don't.' You put yourself between him and the shore.",next:"crew_ending_holds_odysseus"},{text:"You look away. You're too tired. Let him have this.",next:"crew_ending_watches_shout"}]},
  crew_ending_holds_odysseus: { id:"crew_ending_holds_odysseus", isEnding:true, endingType:"triumph", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"THE HAND THAT HELD", endingText:"He looks at you.\n\nThe name is right there — you can see it in his jaw, his hands, his eyes. His whole body wants to shout it at the receding shore.\n\nYou don't say anything. You just hold on.\n\nHe doesn't shout.\n\nThe island falls behind you. Polyphemus howls at nothing on his cliff.\n\nOdysseus looks at his hands for a long moment. Then: 'Thank you.' Just that. Just once. Quietly, so only you can hear it.\n\nFrom Odysseus of Ithaca, that's a speech.\n\nThe sea is wide and still and you are going home.", sagaCount:"2 of 9"},
  crew_ending_watches_shout: { id:"crew_ending_watches_shout", isEnding:true, endingType:"cursed", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"YOU WATCHED", endingText:"The name rings out across the water.\n\nYou watch Polyphemus's face change. Watch him raise his hands to the sky.\n\nYou watch the prayer go up.\n\nYou will be on this sea for a long time. You already know.\n\nBut you were there when Polites died — or didn't — and you made it out, and the sun is on your face, and the sea smells like salt and distance.\n\nSometimes survival is the whole story.\n\nYou'll get home eventually. So will Odysseus.\n\nEventually.", sagaCount:"2 of 9"},
};

const CYCLOPS_GOD = {
  start: { id:"start", saga:"THE CYCLOPS SAGA — FROM OLYMPUS", title:"CHOOSE YOUR DIVINITY", text:"Somewhere in the wine-dark sea, twelve men have wandered into a cave they should never have entered.\n\nOne of them is Odysseus of Ithaca — the cleverest mortal alive, beloved of Athena, despised by fate.\n\nThe other is Polyphemus — son of Poseidon, shepherd, one-eyed, who has never been bested by anything smaller than a mountain.\n\nFrom Olympus, two gods take notice.", choices:[{text:"I am Athena — and Odysseus is mine",next:"athena_start"},{text:"I am Poseidon — and that is my son",next:"poseidon_start"}]},
  athena_start: { id:"athena_start", saga:"THE CYCLOPS SAGA — ATHENA'S WATCH", title:"YOUR FAVORITE FOOL", text:"You have watched over Odysseus since before Troy. You gave him the horse. You guided him through the sack of the city.\n\nAnd now you watch him walk — willingly, curiously, characteristically — into a giant's cave.\n\nYou could intervene. You could appear to him as the wind and push him back toward the beach.\n\nBut you have intervened before. And he keeps ending up in caves.", choices:[{text:"Appear to him. Warn him out of the cave before the boulder rolls.",next:"athena_warns"},{text:"Watch. Let the cave happen. Be ready for what comes after.",next:"athena_watches"}]},
  poseidon_start: { id:"poseidon_start", saga:"THE CYCLOPS SAGA — POSEIDON'S SON", title:"BLOOD AND WATER", text:"Polyphemus is not your favorite son. He is simple, violent, and spends most of his time alone on an island talking to sheep.\n\nBut he is your son.\n\nAnd there are strangers in his cave.\n\nYou watch from the deep water — the place where ocean meets ocean floor, where the pressure would crush any mortal thing — and you wait to see what happens.", choices:[{text:"Send a current to wreck their ships on the rocks before they reach the cave.",next:"poseidon_early"},{text:"Watch. Your son can handle strangers. He always has.",next:"poseidon_watches"}]},
  athena_warns: { id:"athena_warns", saga:"THE CYCLOPS SAGA — ATHENA'S WATCH", title:"THE WIND THAT SPEAKS", text:"You become the wind. A cold gust off the sea, wrong direction, carrying the smell of something large and sleeping.\n\nOdysseus stops at the cave entrance. He's good at reading the world — always has been. He feels the warning.\n\nHe looks at his men. Then back at the cave.\n\nHis curiosity is stronger than your wind.\n\nHe goes in anyway.\n\nYou watch him go, and something between exasperation and affection moves through you.", choices:[{text:"Follow him in. Be the darkness that guides his hand.",next:"athena_guides_inside"},{text:"Wait outside. Be ready to guide his escape.",next:"athena_guides_escape"}]},
  athena_watches: { id:"athena_watches", saga:"THE CYCLOPS SAGA — ATHENA'S WATCH", title:"THE PLAN", text:"The cave. The boulder. The blinding.\n\nOdysseus does what Odysseus does — calculates, deceives, survives. The nobody trick. The wine. The stake.\n\nYou watch Polites die. You watch Odysseus go still in that way he has. You watch the plan take shape in the dark.\n\nHe doesn't need you for this part.\n\nBut now they're on the boats. And the name is rising in his throat.", choices:[{text:"Become the wind. Drown out his voice before the words leave his mouth.",next:"athena_silences"},{text:"Let him speak. He has to learn this himself.",next:"athena_lets_it_happen"}]},
  poseidon_early: { id:"poseidon_early", saga:"THE CYCLOPS SAGA — POSEIDON'S SON", title:"THE CURRENT", text:"You send a rip current along the eastern coast of the island. Subtle. Precise.\n\nOdysseus's ships are pushed three miles south — away from the cave, toward the gentler shore on the other side of the island.\n\nThe men make camp on the beach. They find fruit. They eat. They rest.\n\nPolyphemus sleeps undisturbed.\n\nOdysseus never finds the cave.\n\nIn the morning they sail on — smaller, simpler, no glory, no tragedy.", choices:[{text:"Let them go. Your son is safe.",next:"poseidon_ending_peace"}]},
  poseidon_watches: { id:"poseidon_watches", saga:"THE CYCLOPS SAGA — POSEIDON'S SON", title:"THE SCREAM", text:"Your son screams.\n\nThe sound reaches you in the deep places — through miles of water, through the pressure and the dark — because you are his father and fathers hear these things.\n\nThe stake. His eye.\n\nYou rise toward the surface. Slow. Patient. The way deep things move.\n\nBy the time you arrive at the surface, they're already on the boats.", choices:[{text:"Capsize the boats now. Your son's prayer or yours — it doesn't matter.",next:"poseidon_acts_now"},{text:"Wait. Let the mortal shout his name. Give the prayer something to work with.",next:"poseidon_waits_for_prayer"}]},
  athena_guides_inside: { id:"athena_guides_inside", saga:"THE CYCLOPS SAGA — ATHENA'S WATCH", title:"INSIDE THE DARK", text:"You are the darkness inside the cave. The steadiness in his hands when he sharpens the stake. The calculation that keeps the panic at bay.\n\nYou cannot save Polites. Some things are not within your reach.\n\nBut you can make sure the stake finds its mark.\n\nWhen it does — when the scream fills the island and the other Cyclopes come and go and the sheep file out in the morning — you are every beam of sunlight that falls on the men as they run.", choices:[{text:"Stay with him. Be the wind in his sails.",next:"athena_stays_close"}]},
  athena_guides_escape: { id:"athena_guides_escape", saga:"THE CYCLOPS SAGA — ATHENA'S WATCH", title:"THE MORNING", text:"You wait outside.\n\nThe scream comes. The 'nobody' trick works — because Odysseus is Odysseus, and even in a cave with a one-eyed giant he has time to be clever.\n\nThe sheep file out in the morning light and your men are underneath them.\n\nThey run.\n\nOdysseus reaches his ship. The oars are in the water.\n\nHis mouth is opening.", choices:[{text:"Fill his mouth with saltwater spray. Something. Anything.",next:"athena_silences"},{text:"Let him speak. You cannot always stop him.",next:"athena_lets_it_happen"}]},
  athena_silences: { id:"athena_silences", saga:"THE CYCLOPS SAGA — ATHENA'S WATCH", title:"THE WIND BETWEEN WORDS", text:"You become the wind between his open mouth and the shore.\n\nThe words come out differently. Quieter. Carried sideways, into the waves.\n\nPolyphemus hears nothing. Curses no one. Prays to no one.\n\nOdysseus sits back down. He looks at his hands. He knows something happened — he always knows when you've interfered — but he can't name it.\n\nThe island shrinks behind you.", choices:[{text:"Sail with him. Let him know, gently, that you were there.",next:"athena_ending_guided"}]},
  athena_lets_it_happen: { id:"athena_lets_it_happen", saga:"THE CYCLOPS SAGA — ATHENA'S WATCH", title:"MY GOODBYE", text:"The name goes out across the water.\n\nPolyphemus prays.\n\nYou hear Poseidon stir somewhere below the waves.\n\nYou appear to Odysseus then — not physically, not yet, but as the wind going still. As the particular quality of silence that he has always known means you.\n\nHe looks up.\n\n'I know,' he says. To the sky. To you.\n\nYou stay with him anyway. You always do. But there is a distance now — thin as a hair, wide as the sea.", choices:[{text:"'I'll be there. Even now. Even after this.'",next:"athena_ending_my_goodbye"},{text:"Say nothing. Let the silence be honest.",next:"athena_ending_silence"}]},
  athena_stays_close: { id:"athena_stays_close", saga:"THE CYCLOPS SAGA — ATHENA'S WATCH", title:"THE SHOUT", text:"You are the wind in his sails when his mouth opens.\n\nYou try to swallow the words. But they're out before you can move.\n\nHis name. Across the water. Into Polyphemus's prayer. Into Poseidon's ears.\n\nYou feel your brother stir in the deep places.\n\nThis is the cost of loving a mortal who has to be known.", choices:[{text:"Stay with him. Fight Poseidon for every mile of his journey home.",next:"athena_ending_my_goodbye"}]},
  poseidon_acts_now: { id:"poseidon_acts_now", saga:"THE CYCLOPS SAGA — POSEIDON'S SON", title:"THE WAVE", text:"You send one wave.\n\nNot a storm — one precise, enormous wall of water, aimed at the boats.\n\nOdysseus's ships are good ships. His men are good sailors. Some of them make it to shore.\n\nOdysseus makes it to shore. Of course he does.\n\nBut his men are scattered. His ships are matchwood. And he is alone on a strange coast with no name and no army and no plan.\n\nHe will find his way eventually. He always does.\n\nBut it will be a very long walk home.", choices:[{text:"Turn back to the deep. Your son is avenged.",next:"poseidon_ending_wave"}]},
  poseidon_waits_for_prayer: { id:"poseidon_waits_for_prayer", saga:"THE CYCLOPS SAGA — POSEIDON'S SON", title:"THE NAME", text:"The name rings out across the water.\n\nOdysseus of Ithaca. Son of Laertes. King.\n\nYour son raises his hands. The prayer rises through the salt air and the cold water and you receive it like a gift.\n\nNow you have a name.\n\nNow you have a direction.\n\nNow you have twenty years.", choices:[{text:"Accept the prayer. Curse him fully — he never reaches home.",next:"poseidon_full_curse"},{text:"Accept the prayer. Curse him partially — late, alone, in grief.",next:"poseidon_half_curse"}]},
  athena_ending_guided: { id:"athena_ending_guided", isEnding:true, endingType:"triumph", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"STILL WATCHING", endingText:"The wind is at your back all the way to the open sea.\n\nOdysseus doesn't shout his name. Maybe he wanted to. Maybe something in the air tasted like warning and he listened — for once — to the warning.\n\nPolites is gone and that weight will not lift. But the surviving men are on the ships, and the ships are moving, and somewhere in the bow Odysseus is staring at the horizon with the look he gets when he is already solving the next problem.\n\nYou are the warmth in the breeze.\n\nYou are still watching.\n\nYou will always be watching.", sagaCount:"2 of 9"},
  athena_ending_my_goodbye: { id:"athena_ending_my_goodbye", isEnding:true, endingType:"cursed", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"MY GOODBYE", endingText:"You stay.\n\nYou said you would, and you do, because that is what you are — the goddess who stays even when she shouldn't.\n\nBut the distance is there now. Thin as a hair. Real as the sea.\n\nHe will reach home. You will make sure of that — through every storm Poseidon throws, every island, every monster, every year.\n\nBut it will cost him. And it will cost you.\n\nThere is a song about this moment. It hasn't been written yet.\n\nIt will be called My Goodbye.", sagaCount:"2 of 9"},
  athena_ending_silence: { id:"athena_ending_silence", isEnding:true, endingType:"unknown", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"WHAT GODS FEEL", endingText:"You say nothing.\n\nThe wind stays still for a long moment. Long enough for him to understand.\n\nThen you let the sails fill.\n\nNot with warmth. Not with the particular wind that has always meant you were nearby. Just wind. Sea wind. The kind anyone gets.\n\nHe rows.\n\nYou watch.\n\nYou will intervene again — you know you will — when the moment is bad enough. You cannot stop yourself.\n\nBut today you let the silence be honest.\n\nSometimes that is the only gift that means anything.", sagaCount:"2 of 9"},
  poseidon_ending_peace: { id:"poseidon_ending_peace", isEnding:true, endingType:"triumph", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"THE UNDISTURBED CAVE", endingText:"Odysseus sails away from the island never knowing what he missed.\n\nPolyphemus wakes at dawn and tends his flock and speaks to his favorite ram — the one he always tells his troubles to — and does not know that anything was averted.\n\nYou return to the deep places.\n\nAthena's mortal sails on, unscathed, no curse on his name, no prayer delivered to you.\n\nYou are patient. The sea is long.\n\nThere will be other chances.\n\nBut today — today your son sleeps soundly. And that is enough.", sagaCount:"2 of 9"},
  poseidon_ending_wave: { id:"poseidon_ending_wave", isEnding:true, endingType:"triumph", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"FATHER'S ANSWER", endingText:"One wave.\n\nOdysseus survives it — he always survives — but he is alone on a strange coast, stripped of ships and men and plan, starting over from nothing.\n\nPolyphemus stops screaming. He tends his flock. He speaks to his favorite ram.\n\nYou return to the deep places.\n\nAthena will find Odysseus eventually. She always does. She'll put him back together, aim him toward home, spend herself making up for what you took.\n\nLet her.\n\nYou are Poseidon. You are the sea itself.\n\nThe sea always wins eventually.", sagaCount:"2 of 9"},
  poseidon_full_curse: { id:"poseidon_full_curse", isEnding:true, endingType:"cursed", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"THE GOD IN THE DEEP", endingText:"The curse settles over the sea like a change in weather.\n\nOdysseus of Ithaca will sail and sail and sail. Every time home appears on the horizon, something will go wrong. A storm. A god. A beautiful island with a beautiful problem.\n\nAthena will fight you for him — she already is, you can feel her — but even Athena can only do so much against the full weight of the sea.\n\nYou return to the deep places.\n\nYou can wait.\n\nYou are everywhere he needs to go.", sagaCount:"2 of 9"},
  poseidon_half_curse: { id:"poseidon_half_curse", isEnding:true, endingType:"unknown", saga:"THE CYCLOPS SAGA — EPILOGUE", endingTitle:"THE PARTIAL MERCY", endingText:"You pause.\n\nYour son cries below you. That sound — that specific sound — is older than judgment.\n\nTwenty years is too long, even for your patience.\n\n'Late,' you say. 'Alone. On a stranger's ship. To find grief at home.'\n\nIt is not nothing. It is not everything.\n\nAthena will call it mercy. You call it efficiency.\n\nHe'll suffer enough.\n\nThe sea closes over your answer like a door.", sagaCount:"2 of 9"},
};

// ============================================================
// STORY REGISTRY
// ============================================================

const STORIES = {
  troy: { odysseus: TROY_ODYSSEUS, crew: TROY_CREW, god: TROY_GOD },
  cyclops: { odysseus: CYCLOPS_ODYSSEUS, crew: CYCLOPS_CREW, god: CYCLOPS_GOD },
};

const SAGAS = [
  { id:"troy", number:"I", title:"THE TROY SAGA", subtitle:"Songs: The Horse & The Infant, Open Arms, Warrior of the Mind", desc:"Ten years of war end in one night of fire. The choices you make in Troy's ashes will follow you across every sea.", status:"ready", color:"#ff0033" },
  { id:"cyclops", number:"II", title:"THE CYCLOPS SAGA", subtitle:"Songs: Polyphemus, Survive, Remember Them, My Goodbye", desc:"A cave. A giant. A name that could save you or doom you. Escape — but at what cost?", status:"ready", color:"#c9a84c" },
  { id:"ocean", number:"III", title:"THE OCEAN SAGA", subtitle:"Coming soon", desc:"The sea between islands. Aeolus and the bag of winds. What happens when you're one day from home.", status:"soon", color:"#4a90d9" },
  { id:"circe", number:"IV", title:"THE CIRCE SAGA", subtitle:"Coming soon", desc:"The enchantress's island. Transformation. What it means to stay somewhere beautiful.", status:"soon", color:"#9966cc" },
];

// ============================================================
// ENDING CONFIG
// ============================================================

const ENDING_CONFIG = {
  triumph: { color:"#c9a84c", label:"TRIUMPH", border:"rgba(201,168,76,0.4)", bg:"rgba(201,168,76,0.06)" },
  death: { color:"#ff0033", label:"DEATH", border:"rgba(255,0,51,0.4)", bg:"rgba(255,0,51,0.06)" },
  defeat: { color:"#ff0033", label:"DEFEAT", border:"rgba(255,0,51,0.4)", bg:"rgba(255,0,51,0.06)" },
  cursed: { color:"#9966cc", label:"CURSED", border:"rgba(153,102,204,0.4)", bg:"rgba(153,102,204,0.06)" },
  unknown: { color:"#4a90d9", label:"UNKNOWN", border:"rgba(74,144,217,0.4)", bg:"rgba(74,144,217,0.06)" },
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function OdysseyMode() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro");
  const [selectedSaga, setSelectedSaga] = useState(null);
  const [character, setCharacter] = useState(null);
  const [crewName, setCrewName] = useState("");
  const [currentSceneId, setCurrentSceneId] = useState("start");
  const [history, setHistory] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);

  const currentStory = selectedSaga && character ? STORIES[selectedSaga][character] : null;
  const currentScene = currentStory ? currentStory[currentSceneId] : null;
  const displayName = character === "odysseus" ? "Odysseus" : character === "crew" ? (crewName.trim() || "Soldier") : "The God";

  const transition = (newPhase, cb) => {
    setFadeIn(false);
    setTimeout(() => { if (cb) cb(); setFadeIn(true); }, 300);
    setTimeout(() => setPhase(newPhase), 150);
  };

  const handleChoice = (nextId) => {
    const nextScene = currentStory[nextId];
    setFadeIn(false);
    setTimeout(() => {
      setHistory(p => [...p, currentSceneId]);
      setCurrentSceneId(nextId);
      if (nextScene?.isEnding) setPhase("ending");
      setFadeIn(true);
    }, 300);
  };

  const handleBack = () => {
    if (!history.length) return;
    setFadeIn(false);
    setTimeout(() => {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setCurrentSceneId(prev);
      setPhase("story");
      setFadeIn(true);
    }, 300);
  };

  const handleRestart = () => transition("sagas", () => { setCharacter(null); setCrewName(""); setCurrentSceneId("start"); setHistory([]); });

  const startAdventure = () => {
    if (!character) return;
    if (character === "crew" && !crewName.trim()) return;
    transition("story", () => { setCurrentSceneId("start"); setHistory([]); });
  };

  const pageStyle = { minHeight:"100vh", background:"#0a0a0a", color:"#fff", fontFamily:"'Segoe UI', system-ui, sans-serif", position:"relative", overflow:"hidden" };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
    @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
    @keyframes goldPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
    .choice-btn { background:#111; border:1px solid #222; color:#bbb; padding:16px 24px; border-radius:3px; cursor:pointer; font-family:'Rajdhani',sans-serif; font-size:15px; font-weight:600; letter-spacing:1px; text-align:left; transition:all 0.25s ease; width:100%; line-height:1.4; position:relative; overflow:hidden; }
    .choice-btn::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:#c9a84c; transform:scaleY(0); transition:transform 0.25s ease; }
    .choice-btn:hover { background:#161616; border-color:#c9a84c44; color:#fff; transform:translateX(4px); }
    .choice-btn:hover::before { transform:scaleY(1); }
    .saga-card { background:#111; border:1px solid #1a1a1a; border-radius:4px; padding:24px; cursor:pointer; transition:all 0.3s ease; position:relative; overflow:hidden; }
    .saga-card.ready:hover { border-color:#c9a84c44; transform:translateY(-2px); box-shadow:0 6px 24px rgba(201,168,76,0.1); }
    .saga-card.selected { border-color:#c9a84c66; background:#141410; }
    .char-card { background:#111; border:1px solid #1a1a1a; border-radius:4px; padding:24px 20px; cursor:pointer; transition:all 0.3s ease; position:relative; overflow:hidden; }
    .char-card:hover, .char-card.selected { border-color:#c9a84c44; transform:translateY(-2px); box-shadow:0 6px 24px rgba(201,168,76,0.1); }
    .char-card.selected { background:#141410; }
    .back-btn { background:transparent; border:1px solid #222; color:#555; padding:8px 18px; border-radius:3px; cursor:pointer; font-family:'Rajdhani',sans-serif; font-size:12px; font-weight:600; letter-spacing:2px; text-transform:uppercase; transition:all 0.2s ease; }
    .back-btn:hover { border-color:#c9a84c44; color:#c9a84c; }
    .back-btn:disabled { opacity:0.3; cursor:default; }
    .begin-btn { background:linear-gradient(135deg,#c9a84c,#a07830); border:none; color:#0a0a0a; padding:16px 48px; border-radius:3px; cursor:pointer; font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:3px; transition:all 0.3s ease; }
    .begin-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(201,168,76,0.3); }
    .begin-btn:disabled { background:#222; color:#444; cursor:default; transform:none; box-shadow:none; }
    input.name-input { background:#111; border:1px solid #333; color:#fff; padding:12px 16px; border-radius:3px; font-family:'Rajdhani',sans-serif; font-size:15px; width:100%; box-sizing:border-box; outline:none; transition:border-color 0.2s ease; margin-top:12px; }
    input.name-input:focus { border-color:#c9a84c88; }
    input.name-input::placeholder { color:#444; }
  `;

  const BG = (
    <>
      <style>{css}</style>
      <div style={{position:"fixed",top:0,left:0,right:0,height:"2px",background:"rgba(201,168,76,0.1)",animation:"scanline 4s linear infinite",zIndex:10,pointerEvents:"none"}} />
      <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundImage:"linear-gradient(rgba(201,168,76,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.02) 1px,transparent 1px)",backgroundSize:"50px 50px",pointerEvents:"none"}} />
      <div style={{position:"fixed",top:"-150px",left:"50%",transform:"translateX(-50%)",width:"700px",height:"400px",background:"radial-gradient(ellipse,rgba(201,168,76,0.04) 0%,transparent 70%)",pointerEvents:"none"}} />
    </>
  );

  const wrap = { maxWidth:"760px", margin:"0 auto", padding:"60px 24px", position:"relative", zIndex:5, opacity:fadeIn?1:0, transform:fadeIn?"translateY(0)":"translateY(16px)", transition:"opacity 0.3s ease,transform 0.3s ease" };

  const divider = <div style={{width:"60px",height:"1px",background:"linear-gradient(90deg,#c9a84c,transparent)",margin:"28px 0"}} />;

  const label = (text, color="#c9a84c") => (
    <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"11px",letterSpacing:"5px",color,textTransform:"uppercase",fontWeight:600,marginBottom:"8px"}}>
      {text}
    </p>
  );

  // ---- INTRO ----
  if (phase === "intro") return (
    <div style={pageStyle}>{BG}
      <div style={wrap}>
        <button className="back-btn" onClick={() => navigate("/")} style={{marginBottom:"48px"}}>← BACK TO ARCHIVE</button>
        <div style={{textAlign:"center"}}>
          <div style={{display:"inline-block",padding:"6px 20px",border:"1px solid rgba(201,168,76,0.3)",borderRadius:"2px",fontSize:"11px",letterSpacing:"5px",textTransform:"uppercase",color:"#c9a84c",marginBottom:"28px",fontFamily:"'Rajdhani',sans-serif",fontWeight:600,animation:"goldPulse 3s ease-in-out infinite"}}>⚔ NOW ENTERING ⚔</div>
          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(72px,14vw,130px)",lineHeight:0.85,margin:"0 0 16px",letterSpacing:"4px",color:"#fff"}}>
            <span style={{color:"#c9a84c"}}>[ </span>ODYSSEY MODE<span style={{color:"#c9a84c"}}> ]</span>
          </h1>
          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"13px",color:"#666",letterSpacing:"5px",textTransform:"uppercase",margin:"0 0 8px",fontWeight:600}}>9 SAGAS · INSPIRED BY EPIC: THE MUSICAL</p>
          <div style={{width:"80px",height:"1px",background:"linear-gradient(90deg,transparent,#c9a84c,transparent)",margin:"24px auto"}} />
          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"16px",color:"#777",lineHeight:1.8,maxWidth:"520px",margin:"0 auto 48px",fontWeight:500}}>
            The long road home from Troy. Every island a new danger. Every choice a new consequence.<br/><br/>
            Play as <em style={{color:"#c9a84c"}}>Odysseus</em>, a <em style={{color:"#c9a84c"}}>crew member</em>, or one of the <em style={{color:"#c9a84c"}}>gods</em> who shape the journey.
          </p>
          <button className="begin-btn" onClick={() => transition("sagas")}>CHOOSE YOUR SAGA</button>
        </div>
      </div>
    </div>
  );

  // ---- SAGA SELECT ----
  if (phase === "sagas") return (
    <div style={pageStyle}>{BG}
      <div style={wrap}>
        <button className="back-btn" onClick={() => transition("intro")} style={{marginBottom:"40px"}}>← BACK</button>
        {label("⚔ SELECT A SAGA")}
        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"52px",margin:"0 0 32px",letterSpacing:"2px"}}>THE 9 SAGAS</h2>
        <div style={{display:"grid",gap:"14px",marginBottom:"40px"}}>
          {SAGAS.map(s => (
            <div key={s.id} className={`saga-card ${s.status} ${selectedSaga===s.id?"selected":""}`}
              onClick={() => s.status==="ready" && setSelectedSaga(s.id)}>
              {selectedSaga===s.id && <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"radial-gradient(ellipse at top left,rgba(201,168,76,0.06) 0%,transparent 60%)",pointerEvents:"none",borderRadius:"4px"}} />}
              <div style={{display:"flex",alignItems:"flex-start",gap:"20px"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"36px",color:s.status==="ready"?s.color:"#333",flexShrink:0,lineHeight:1,minWidth:"32px",textAlign:"center"}}>{s.number}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap",marginBottom:"4px"}}>
                    <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",margin:0,letterSpacing:"1px",color:s.status==="ready"?(selectedSaga===s.id?s.color:"#fff"):"#333"}}>{s.title}</h3>
                    <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"10px",letterSpacing:"2px",color:s.status==="ready"?"#c9a84c66":"#333",textTransform:"uppercase",fontWeight:700}}>{s.status==="ready"?"▶ AVAILABLE":"◼ COMING SOON"}</span>
                  </div>
                  <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"11px",color:s.status==="ready"?"#c9a84c55":"#333",letterSpacing:"2px",textTransform:"uppercase",margin:"0 0 6px",fontWeight:600}}>{s.subtitle}</p>
                  <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"14px",color:s.status==="ready"?"#777":"#333",margin:0,lineHeight:1.5,fontWeight:500}}>{s.desc}</p>
                </div>
                {selectedSaga===s.id && <div style={{width:"18px",height:"18px",border:"2px solid #c9a84c",borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:"9px",height:"9px",borderRadius:"50%",background:"#c9a84c"}} /></div>}
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center"}}>
          <button className="begin-btn" onClick={() => selectedSaga && transition("select")} disabled={!selectedSaga}>
            {selectedSaga ? `ENTER ${SAGAS.find(s=>s.id===selectedSaga)?.title}` : "SELECT A SAGA"}
          </button>
        </div>
      </div>
    </div>
  );

  // ---- CHARACTER SELECT ----
  if (phase === "select") {
    const chars = [
      {id:"odysseus",icon:"👑",title:"ODYSSEUS",subtitle:"King of Ithaca",desc:"The cleverest man in Greece. Every choice is yours. Every consequence too.",color:"#c9a84c"},
      {id:"crew",icon:"⚔️",title:"CREW MEMBER",subtitle:"Soldier of Ithaca",desc:"You follow. You survive. Your choices are smaller — but no less real.",color:"#888",hasInput:true},
      {id:"god",icon:"⚡",title:"THE DIVINE",subtitle:"Athena or Poseidon",desc:"You are older than war. Your choices shape the world.",color:"#9966cc"},
    ];
    const canStart = character && (character !== "crew" || crewName.trim().length > 0);
    return (
      <div style={pageStyle}>{BG}
        <div style={wrap}>
          <button className="back-btn" onClick={() => transition("sagas")} style={{marginBottom:"40px"}}>← BACK</button>
          {label("⚔ CHOOSE YOUR PATH")}
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"52px",margin:"0 0 32px",letterSpacing:"2px"}}>WHO ARE YOU?</h2>
          <div style={{display:"grid",gap:"14px",marginBottom:"36px"}}>
            {chars.map(c => (
              <div key={c.id} className={`char-card ${character===c.id?"selected":""}`} onClick={() => setCharacter(c.id)}>
                {character===c.id && <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse at top left,${c.color}08 0%,transparent 60%)`,pointerEvents:"none",borderRadius:"4px"}} />}
                <div style={{display:"flex",alignItems:"flex-start",gap:"16px"}}>
                  <div style={{fontSize:"28px",filter:character===c.id?"none":"grayscale(0.5) opacity(0.6)",transition:"filter 0.3s",flexShrink:0}}>{c.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px"}}>
                      <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",margin:0,letterSpacing:"2px",color:character===c.id?c.color:"#fff",transition:"color 0.3s"}}>{c.title}</h3>
                      <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"11px",letterSpacing:"2px",color:"#555",textTransform:"uppercase",fontWeight:600}}>{c.subtitle}</span>
                    </div>
                    <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"14px",color:"#777",margin:0,lineHeight:1.5,fontWeight:500}}>{c.desc}</p>
                    {c.hasInput && character==="crew" && (
                      <input className="name-input" type="text" placeholder="Enter your name, soldier..." value={crewName} onChange={e=>setCrewName(e.target.value)} maxLength={20} onClick={e=>e.stopPropagation()} autoFocus />
                    )}
                  </div>
                  {character===c.id && <div style={{width:"18px",height:"18px",border:`2px solid ${c.color}`,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:"9px",height:"9px",borderRadius:"50%",background:c.color}} /></div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center"}}>
            {character==="crew"&&!crewName.trim()&&<p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"12px",color:"#555",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"16px"}}>Enter your name to begin</p>}
            <button className="begin-btn" onClick={startAdventure} disabled={!canStart}>
              {character==="crew"&&crewName.trim()?`BEGIN AS ${crewName.toUpperCase()}`:character==="odysseus"?"BEGIN AS ODYSSEUS":character==="god"?"ASCEND TO OLYMPUS":"CHOOSE YOUR PATH"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- STORY ----
  if (phase === "story" && currentScene) return (
    <div style={pageStyle}>{BG}
      <div style={wrap}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"48px"}}>
          <button className="back-btn" onClick={handleBack} disabled={history.length===0}>← BACK</button>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"11px",letterSpacing:"3px",color:"#444",textTransform:"uppercase",fontWeight:600}}>
            Playing as: <span style={{color:"#c9a84c"}}>{displayName}</span>
          </div>
          <button className="back-btn" onClick={handleRestart}>RESTART</button>
        </div>
        <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"11px",letterSpacing:"4px",color:"#c9a84c",textTransform:"uppercase",fontWeight:600,marginBottom:"8px"}}>{currentScene.saga}</p>
        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(40px,8vw,72px)",lineHeight:0.9,margin:"0 0 32px",letterSpacing:"2px",color:"#fff"}}>{currentScene.title}</h2>
        <div style={{width:"50px",height:"1px",background:"linear-gradient(90deg,#c9a84c,transparent)",marginBottom:"32px"}} />
        <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderLeft:"3px solid rgba(201,168,76,0.3)",borderRadius:"3px",padding:"28px",marginBottom:"36px"}}>
          {currentScene.text.split("\n\n").map((p,i,a) => (
            <p key={i} style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"16px",color:"#aaa",lineHeight:1.9,margin:i<a.length-1?"0 0 16px 0":0,fontWeight:500}}>{p}</p>
          ))}
        </div>
        {currentScene.choices && (
          <div>
            <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"11px",letterSpacing:"4px",color:"#444",textTransform:"uppercase",fontWeight:700,marginBottom:"14px"}}>◈ WHAT DO YOU DO?</p>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {currentScene.choices.map((c,i) => (
                <button key={i} className="choice-btn" onClick={() => handleChoice(c.next)}>
                  <span style={{color:"#c9a84c",marginRight:"10px",fontFamily:"'Bebas Neue',sans-serif",fontSize:"14px"}}>{String.fromCharCode(65+i)}.</span>
                  {c.text}
                </button>
              ))}
            </div>
          </div>
        )}
        {history.length > 0 && (
          <div style={{display:"flex",gap:"6px",marginTop:"36px",justifyContent:"center"}}>
            {[...history,currentSceneId].map((_,i) => (
              <div key={i} style={{width:"6px",height:"6px",borderRadius:"50%",background:i===history.length?"#c9a84c":"#2a2a2a"}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ---- ENDING ----
  if (phase === "ending" && currentScene) {
    const ec = ENDING_CONFIG[currentScene.endingType] || ENDING_CONFIG.unknown;
    const sagaCount = currentScene.sagaCount || "? of 9";
    return (
      <div style={pageStyle}>{BG}
        <div style={wrap}>
          <div style={{textAlign:"center",paddingTop:"20px"}}>
            <div style={{display:"inline-block",padding:"6px 24px",border:`1px solid ${ec.border}`,background:ec.bg,borderRadius:"2px",fontFamily:"'Bebas Neue',sans-serif",fontSize:"14px",letterSpacing:"5px",color:ec.color,marginBottom:"32px"}}>◆ {ec.label} ◆</div>
            <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"11px",letterSpacing:"4px",color:"#555",textTransform:"uppercase",fontWeight:600,marginBottom:"12px"}}>{currentScene.saga}</p>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(44px,9vw,80px)",lineHeight:0.9,margin:"0 0 32px",letterSpacing:"3px",color:ec.color}}>{currentScene.endingTitle}</h2>
            <div style={{width:"80px",height:"1px",background:`linear-gradient(90deg,transparent,${ec.color},transparent)`,margin:"0 auto 40px"}} />
            <div style={{background:"#0d0d0d",border:`1px solid ${ec.border}`,borderRadius:"4px",padding:"36px",maxWidth:"580px",margin:"0 auto 48px",textAlign:"left"}}>
              {currentScene.endingText.split("\n\n").map((p,i,a) => (
                <p key={i} style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"16px",color:"#bbb",lineHeight:2,margin:i<a.length-1?"0 0 16px 0":0,fontWeight:500,fontStyle:"italic"}}>{p}</p>
              ))}
            </div>
            <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"12px",color:"#444",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"32px",fontWeight:600}}>
              Played as: <span style={{color:"#666"}}>{displayName}</span>{"  ·  "}
              Choices made: <span style={{color:"#666"}}>{history.length}</span>
            </p>
            <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
              <button className="begin-btn" onClick={handleRestart}>PLAY AGAIN</button>
              <button className="back-btn" onClick={() => navigate("/")} style={{padding:"14px 32px",fontSize:"14px"}}>← BACK TO ARCHIVE</button>
            </div>
            <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"12px",color:"#333",letterSpacing:"2px",marginTop:"40px",fontWeight:600}}>
              SAGA {sagaCount} COMPLETE
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
