import random
import os

# Constants for board elements
START = "S"
STOP = "T"
OBSTACLE = "X"
EMPTY = " "
PLAYER = "P"

ROWS = 5
COLS = 5
NUMBER_OF_OBSTACLES = 10

class GameBoard:
    def __init__(self, rows, cols, number_of_obstacles):
        self.rows = rows
        self.cols = cols
        self.number_of_obstacles = number_of_obstacles
        self.board = [[EMPTY for _ in range(cols)] for _ in range(rows)]
        self.start = None
        self.stop = None
        self.player = None
        self.generate_board()

    def generate_board(self):
        self.start = self._random_position(first_half=True)
        self.stop = self._random_position(first_half=False)
        self.board[self.start[0]][self.start[1]] = START
        self.board[self.stop[0]][self.stop[1]] = STOP
        self.path = self._find_path(self.start, self.stop)

        self._place_obstacles()
        self.player = self.start
        self.spawn_player()

    def _random_position(self, first_half):
        if first_half:
            return (random.randint(0, self.rows // 2 - 1), random.randint(0, self.cols // 2 - 1))
        else:
            return (random.randint(self.rows // 2, self.rows - 1), random.randint(self.cols // 2, self.cols - 1))

    def _find_path(self, start, stop):
        from collections import deque

        queue = deque([start])
        visited = set()
        came_from = {start: None}

        while queue:
            current = queue.popleft()
            if current == stop:
                break
            visited.add(current)
            for neighbor in self._get_neighbors(current):
                if neighbor not in visited and neighbor not in came_from:
                    queue.append(neighbor)
                    came_from[neighbor] = current

        path = []
        current = stop
        while current is not None:
            path.append(current)
            current = came_from[current]
        return path[::-1]

    def _get_neighbors(self, pos):
        x, y = pos
        neighbors = []
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < self.rows and 0 <= ny < self.cols:
                neighbors.append((nx, ny))
        return neighbors

    def _place_obstacles(self):
        obstacles_placed = 0
        while obstacles_placed < self.number_of_obstacles:
            x, y = random.randint(0, self.rows - 1), random.randint(0, self.cols - 1)
            if (x, y) != self.start and (x, y) != self.stop and (x, y) not in self.path:
                self.board[x][y] = OBSTACLE
                obstacles_placed += 1

    def spawn_player(self):
        self.board[self.player[0]][self.player[1]] = PLAYER

    def move_player(self, direction):
        dx, dy = {"w": (-1, 0), "s": (1, 0), "a": (0, -1), "d": (0, 1)}.get(direction, (0, 0))
        new_x, new_y = self.player[0] + dx, self.player[1] + dy

        if self._is_valid_move(new_x, new_y):
            self.board[self.player[0]][self.player[1]] = EMPTY  # Clear old position
            self.player = (new_x, new_y)
            self.board[new_x][new_y] = PLAYER
            return True
        return False

    def _is_valid_move(self, x, y):
        return 0 <= x < self.rows and 0 <= y < self.cols and self.board[x][y] != OBSTACLE

    def is_game_over(self):
        return self.player == self.stop

    def display(self):
        os.system('clear' if os.name == 'posix' else 'cls')
        for row in self.board:
            print(" ".join(row))
        print()


def get_player_input():
    return input("Wprowadź ruch (w - góra, s - dół, a - lewo, d - prawo): ").lower()


if __name__ == "__main__":
    game = GameBoard(ROWS, COLS, NUMBER_OF_OBSTACLES)
    message = ""
    while not game.is_game_over():
        game.display()
        print(message)
        move = get_player_input()
        if move in ["w", "s", "a", "d"]:
            message = ""
            if not game.move_player(move):
                message = "Nie można wykonać ruchu w tym kierunku."
        else:
            message = "Nieprawidłowy ruch. Użyj: w, s, a, d."

    game.display()
    print("Gratulacje! Dotarłeś do celu!")