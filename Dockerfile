# Используйте официальный образ Node.js
FROM node:18

# Устанавливаем директорию приложения внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

COPY ./docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"] # Указываем команду для запуска приложения (можно заменить на npm run dev для режима разработки)
