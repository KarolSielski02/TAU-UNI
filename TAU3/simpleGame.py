import random
import os

class GameBoard:
    def __init__(self, rows, cols):
        self.rows = max(5, rows)
        self.cols = max(5, cols)
        self.board = [[" " for _ in range(self.cols)] for _ in range(self.rows)]
        self.start = None
        self.stop = None
        self.player_pos = None
        self.path = []
        self._generate_board()

    def _generate_board(self):
        self.start = self._random_edge_position()
        self.stop = self._random_edge_position(avoid=self.start)
        self.player_pos = self.start
        self.board[self.start[0]][self.start[1]] = "A"
        self.board[self.stop[0]][self.stop[1]] = "B"

        self.path = self._generate_path(self.start, self.stop)

        for _ in range((self.rows * self.cols) // 2):  # Ok. 50% planszy to przeszkody
            x, y = random.randint(0, self.rows - 1), random.randint(0, self.cols - 1)
            if (x, y) not in self.path and (x, y) not in [self.start, self.stop]:
                self.board[x][y] = "X"

    def _generate_path(self, start, stop):
        stack = [start]
        visited = set()
        path = {start: None}

        while stack:
            current = stack.pop()
            if current == stop:
                break
            visited.add(current)
            neighbors = self._get_neighbors(current)
            for neighbor in neighbors:
                if neighbor not in visited and neighbor not in path:
                    stack.append(neighbor)
                    path[neighbor] = current

        current = stop
        result_path = []
        while current is not None:
            result_path.append(current)
            current = path[current]
        result_path.reverse()
        print("result_path", result_path)
        return result_path

    def _get_neighbors(self, pos):
        x, y = pos
        neighbors = []
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < self.rows and 0 <= ny < self.cols:
                neighbors.append((nx, ny))
        return neighbors

    def _random_edge_position(self, avoid=None):
        while True:
            if random.choice([True, False]):  # horizontal
                pos = (random.choice([0, self.rows - 1]), random.randint(0, self.cols - 1))
            else:  # vertical
                pos = (random.randint(0, self.rows - 1), random.choice([0, self.cols - 1]))
            if avoid and abs(pos[0] - avoid[0]) + abs(pos[1] - avoid[1]) <= 1:
                continue  # avoid neighbouring positions
            return pos

    def display(self):
        for row in self.board:
            print(" ".join(row))
        print()

    def can_move(self, x, y):
        if 0 <= x < self.rows and 0 <= y < self.cols:
            return self.board[x][y] == " "
        return False

    def move_player(self, direction):
        dx, dy = {"w": (-1, 0), "s": (1, 0), "a": (0, -1), "d": (0, 1)}.get(direction, (0, 0))
        new_x, new_y = self.player_pos[0] + dx, self.player_pos[1] + dy

        os.system('clear')

        if self.can_move(new_x, new_y):
            self.board[self.player_pos[0]][self.player_pos[1]] = " "
            self.player_pos = (new_x, new_y)
            self.board[new_x][new_y] = "A"
            return True
        elif (new_x, new_y) == self.stop:
            self.board[self.player_pos[0]][self.player_pos[1]] = " "
            self.player_pos = (new_x, new_y)
            print("Gratulacje! Dotarłeś do celu!")
            return False
        else:
            print("Nie można wykonać ruchu w tym kierunku.")
            return True


board = GameBoard(10, 10)
playing = True

while playing:
    board.display()
    move = input("Wprowadź ruch (w - góra, s - dół, a - lewo, d - prawo): ").lower()
    if move in ["w", "s", "a", "d"]:
        playing = board.move_player(move)
    else:
        print("Nieprawidłowy ruch. Użyj: w, s, a, d.")