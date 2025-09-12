# Build stage - React
FROM node:20 AS frontend-build
WORKDIR /app
COPY client/ ./client
RUN ls -al /app/client
WORKDIR /app/client
RUN npm install && npm run build

# Build stage - .NET
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY API/API.csproj API/
COPY . .
RUN dotnet restore API/API.csproj
RUN dotnet publish API/API.csproj -c Release -o /app/publish

# Final stage - runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
COPY --from=frontend-build /app/client/dist ./wwwroot
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "API.dll"]
