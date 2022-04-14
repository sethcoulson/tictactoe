from pickle import TRUE
from tkinter import W

#Rotates the board 90 degrees clockwise
def rotate( b:tuple ):
    return (b[6], b[3], b[0], b[7], b[4], b[1], b[8], b[5], b[2] )

#Reflects the board over the vertical axis  
def reflect( b:tuple ):
    return (b[2], b[1], b[0], b[5], b[4], b[3], b[8], b[7], b[6] )

#Retuns all the logically equivalent boards in a set
def equiv( b:tuple ):
    return set( [b, 
            rotate(b),
            rotate( rotate( b ) ),
            rotate( rotate( rotate( b ))), 
            reflect(b),
            rotate( reflect(b) ),
            rotate( rotate( reflect(b) )),
            rotate( rotate( rotate( reflect(b)))) ] )
            

#Returns list of all legal next board states
def next_states( b: tuple ):
    rv = []

    if not terminal_state( b )[ "terminal" ]:
        os = b.count("o")
        xs = b.count("x")
        next = "o" if os == xs else "x"
        
        for i in range(0, 9):
            tmp = list(b)
            if tmp[i] == "":
                tmp[i] = next
                rv.append( tuple(tmp) )
    
    return rv

#Checks board to see if in a win or draw state
def terminal_state( b: tuple ):

    if (b[0] != "") and ((b[0]==b[1] and b[1]==b[2]) or (b[0]==b[3] and b[3]==b[6]) or (b[0]==b[4] and b[4]==b[8])):
        rv = {"terminal": True, "type": "win", "player": b[0], "score": 10 if b[0] == "o" else -10 }
    elif (b[4]!="") and ((b[3]==b[4] and b[4]==b[5]) or (b[1]==b[4] and b[4]==b[7]) or (b[2]==b[4] and b[4]==b[6])):
        rv = {"terminal": True, "type": "win", "player": b[4], "score": 10 if b[4] == "o" else -10 }
    elif b[6]!="" and b[6]==b[7] and b[7]==b[8]:
        rv = {"terminal": True, "type": "win", "player": b[6], "score": 10 if b[6] == "o" else -10 }
    elif b[2]!="" and b[2]==b[5] and b[5]==b[8]:
        rv = {"terminal": True, "type": "win", "player": b[2], "score": 10 if b[2] == "o" else -10 }
    elif b.count("x")+b.count("o")==9:
        rv = {"terminal": True, "type": "draw", "player": "", "score": 0}
    else:
        rv = {"terminal": False, "type": "", "player": ""}
    
    return rv

#Accumulate all possible states of game
def accum( game: tuple, acc: set ):
    acc.add( game )
    ns = next_states( game );

    #Recurse through children
    for n in ns:
        accum( n, acc )

#finds all the number of paths of gameplay that lead to a given boardstate.
def count_paths( game: tuple, equiv: dict, use_equiv: bool, cnt:bool ) -> tuple:
    win_count = loss_count = draw_count = 0
    ns = next_states( game )
    tmp = set()

    if use_equiv:
        for n in ns:
            #adds the logicaly unique vertion of each of the boards next states to the set tmp
            tmp.add( equiv[n] )
    else:
        #if the user is does not have the use equive element of this funciton engages, it just adds the board to the set tmp.
        tmp = ns
    #the cnt boolean if true causes this function to disregard the chance of a boardstate being reached. if it is not true, boardstates that are more likeley
    #to be reached are valued higher. 
    weight = 1 if cnt else len(tmp)

    for n in tmp:
        t = terminal_state(n)
        if t["type"] == "win" and t["player"] == "o":
            win_count = win_count+1/weight
        elif t["type"] == "win" and t["player"]=="x":
            loss_count = loss_count+1/weight
        elif t["type"] == "draw":
            draw_count = draw_count+1/weight
        else:
            w, l, d = count_paths(n, equiv, use_equiv, cnt)
            win_count = win_count+w/weight
            loss_count = loss_count+l/weight
            draw_count = draw_count+d/weight

    return win_count, loss_count, draw_count


def all_game_states():
    G = ( "","","","","","","","","")
    game_states = set()
    accum( G, game_states )

    #Calculate equivs.
    #the eqiv_cache is a dictionary. this dictionary assigns 
    #logicaly equivalent boards state to each board state.
    equiv_logic = dict()

    #this looks through all possible game states for tic tac toe
    for g in game_states:
        #This finds the set of all locicaly equivelent board states using the previously
        #noted eqiv function.
        equivs = equiv( g )
        #if we haven't assigned a logical equivalent to this board, do so.
        for b in equivs:
            if b not in equiv_logic.keys():
                equiv_logic[ b ] = g

    #Calculate parents
    parents = dict()
    for g in game_states:
        next = next_states( g )
        for n in next:
            if n not in parents:
                parents[n] = []
            parents[ n ].append( g )

    return ( game_states, equiv_logic, parents )

#Generate string representation of the board
def board_str( b: tuple ):
    #String format with constant width (1 space). Each {} is filled by arguments 
    # to the format function. 
    return '{:1}|{:1}|{:1}\n-+-+--\n{:1}|{:1}|{:1}\n-+-+--\n{:1}|{:1}|{:1}\n'.format( b[0],b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8] )

#How many paths between a start board and an end board
def find_number_of_ways_to_get_to_a_specefied_gamestate( start:tuple, end:tuple, game_states = set() ):
    
    if end == start:
        return 0
    
    #If a game_state set is provided, check start and end    
    if len( game_states ) and (start not in game_states or end not in game_states ):
        return 0

    #this finds the next set of potential moves from the given boardstate for start.
    ns = next_states( start )
    count=0

    #"n" in this case is a value in the list "ns". In the for loop, "n" starts as the first value in "ns" 
    #and continues iterrating untill it has gone through every value.
    for n in ns:

        #This counts the number of matches for the number of paths of gameplay it
        #takes to reach the board state that was given for "end".
        if n == end:
            count = count+1

        #This is a example a brain blaster. If you look closely at the screen, you will see bits of brain matter i couldn't clean off. 
        #Alternately, this is a deepth-first graph search usingh recursion!
        else:
            count = count+find_number_of_ways_to_get_to_a_specefied_gamestate( n, end)
    
    return count

#THE AI
def minimax( b:tuple ) -> tuple:

    ts = terminal_state(b)
    #checks if the current board is a terminal state
    if ts["terminal"] :
        opt_score = ts["score"]
        opt_index = None
    else:
        #Determnins whose turn it is
        os = b.count("o")
        xs = b.count("x")
        #chooses whether to find the best possible play for x or for o depending on whose turn it is. 
        opt = max if os == xs else min
        #gets the next potential boardstates
        ns = next_states(b)
        ss = []
        #puts all the next states in a list that is then put recusively through the funciton 
        for n in ns:
            ss.append(minimax(n)[0])
             
        opt_score = opt(ss)
        opt_index = ss.index(opt_score)

    return opt_score, opt_index

def play_minimax():
    b = ("","","", "","", "", "","","" )
    while not terminal_state(b)["terminal"]:
        score,index = minimax( b )
        print( board_str(next_states(b)[index]), "\t", score)
        b = ( next_states(b)[index] )
            

#Print out a collection of the data durived from the functions above. 
def print_data():
    ( game_states, equive_logicaly_unique_game_states, parents ) = all_game_states()
    win, loss, draw = count_paths( tuple(("","","","","","","","","")), equive_logicaly_unique_game_states, False, True) 

    print("The number of all game states is: ", len( game_states))
    print("The number of all logicaly equivelent unque game states is: ", len(set(equive_logicaly_unique_game_states.values())))
    print()

    win, loss, draw = count_paths( tuple(("","","","","","","","","")), equive_logicaly_unique_game_states, False, True) 
    print("The number of all games: ", win + draw + loss)
    print("Wins: ", win, "\t Draw: ", draw, "\t Loss: ", loss)
    win, loss, draw = count_paths( tuple(("","","","","","","","","")), equive_logicaly_unique_game_states, False, False) 
    print("The fraction of winning games for 'o'is: ", win /(win + draw + loss) )
    print("The fraction of loosing games for 'o'is: ", loss/(win + draw + loss))
    print("The fraction of drawing games for 'o'is: ", draw/(win + draw + loss))
    print()

    win, loss, draw = count_paths( tuple(("","","","","","","","","")), equive_logicaly_unique_game_states, True, True) 
    print( "With only logically equivalent states")
    print("The number of all games: ", win + draw + loss)

#print_data()


play_minimax()
