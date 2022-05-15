# Background
Inspired by the book [X and O are BFFs](https://epigrambookshop.sg/products/letter-friends-x-and-o-are-bffs-pos) gifted by a friend, I thought a Tic-Tac-Toe game will be another fun game to play (and build). I bootstrapped and customised the source code from [SourceForge](https://www.sourcecodeexamples.net/2020/09/javascript-tic-tac-toe-game.html).

The original source code supports Pointer Interaction only, which we thought will be useful for our child to learn how to use a mouse, and I can use this on our mobile phones on the go too (viewports not tested yet). I later added keyboard interactions because we have a 6-key programmable keyboard, and will be more fun to do multi-player without sharing the same mouse.

Built using vanilla javascript because it's cleaner with only 3 files (as compared to the YouTube Kids overkill using TypeScript).

# Learnings

### (Child Computer Interaction) Using a mouse for a child
With my dual monitor setup at home, it proved difficult for a 4 year old to find the tiny Mac cursor on 2 screens. This significantly increases the risk of destroying whatever I was doing with my other 120872354 windows and applications opened.

### (Technical) Trying to be too smart with keyboard navigation
When implementing keyboard navigation, I adopted a least keypress mindset, this includes additional features and considerations like the below:-
1. after marking a cell, go to the next empty cell.
2. during navigation, already marked cells should be skipped. 

To elaborate further on Point 2, refer to example below.

Cell `X` is marked. Pressing right arrow `→` when on Cell `0` should bring us to Cell `2`.
| 0 | X | 2 |
|---|---|---|
| 3 | 4 | 5 |
| 6 | 7 | 8 |

While fairly intuitive and convenient, this logic fails in the following 2 scenarios.

1. We will never be able to get to Cell `2`.

| X | X | 2 |
|---|---|---|
| 3 | 4 | X |
| 6 | 7 | X |

2. We will never be able to get to Cell `4`.

| 0 | X | 2 |
|---|---|---|
| X | 4 | X |
| 6 | X | 8 |

We can find this implementation in the branch `xoxo-feat-smartkeypress`. Note that it is poorly written and not refactored since it is deemed as a failed implementation. The solution eventually adopted is to not skip already marked cells, but highlight them in red to indicate that it cannot be marked.